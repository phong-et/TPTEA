import {_post, _procError, _procAlert, _alert} from '../../util/common'
import store from '../index'
import _d from 'lodash'
import {Dialog} from 'quasar'

export const placeOrder = ({commit, getters, dispatch}) => {
  let customer = store().getters['customer/getCustomer']
  if (!_d.isEmpty(customer)) {
    commit('setIsLoading', true)
    _post(
      {
        ...getters.getRecs,
        customerId: customer.id,
        placeOrderMethod: getters.getPlaceOrderMethod,
      },
      `mutation ($input: OrderInput) {
        placeOrder(input: $input)
      }`
    )
      .then(({data}) => {
        if (data.placeOrder) {
          if (customer.balance >= _d.sumBy(getters.getRecs.orderDetails, 'price')) {
            Dialog.create({
              title: 'Confirm',
              message: 'Your order has been placed. Do you want pay now?',
              ok: 'Now',
              cancel: 'Later',
            })
              .then(() => {
                dispatch('payNow', data.placeOrder)
              })
              .catch(() => {})
              .finally(() => {
                _procAlert(data, true)
                commit('setRecs', {})
              })
          } else {
            commit('setRecs', {})
          }
          Dialog.create({
            title: 'Alert',
            message: 'Your order has been placed successfully',
          })
        } else if (data.errors) {
          // trim 'Error: Error:' from msg render by server
          let message = _d.get(data, 'errors[0].message')
          if (typeof message === 'string') {
            let index = message.indexOf('Error: Error: ') === 0 ? 13 : 0
            message = message.substring(index, message.length)
          }
          Dialog.create({
            title: 'Alert',
            message: message,
          })
        }
      })
      .catch(err => {
        _procError(err)
      })
      .finally(() => commit('setIsLoading', false))
  } else _alert('Please login first!', 'warning')
}
export const fetchCustomerOrders = ({commit}) => {
  _post(
    store().getters['customer/getCustomer'].id,
    `query ($input: Int) {
      fetchCustomerOrders(input: $input){
        id
        address
        orderDate
        orderStatus
        totalAmount
        isStorePickUp
      }
    }`
  )
    .then(({data}) => {
      _procAlert(data, true)
      commit('setCustomerOrders', data.fetchCustomerOrders)
    })
    .catch(err => {
      _procError(err)
    })
}
export const fetchCustomerOrderDetail = ({commit}, payload) => {
  _post(
    payload,
    `query ($input: Int) {
      fetchCustomerOrderDetail(input: $input){
        placeOrderMethod {
          storeId
          isStorePickUp
          receivingTime
          address
          deliveryContact
        }
        customerOrder {
          id
          menuId
          modifierIds
          quantity
          price
        }
      }
    }`
  )
    .then(({data}) => {
      _procAlert(data, true)
      commit('setCustomerOrderDetail', data.fetchCustomerOrderDetail)
    })
    .catch(err => {
      _procError(err)
    })
}

export const payNow = ({commit, getters}, orderId) => {
  let customer = store().getters['customer/getCustomer']
  commit('setIsLoading', true)
  if (!_d.isEmpty(customer)) {
    return _post(
      orderId,
      `mutation ($input: Int) {
        payNow(input: $input){
          totalAmount
          balance
        }
      }`
    )
      .then(({data}) => {
        let msg = ''
        if (data.payNow) {
          msg = `You paid ${data.payNow.totalAmount}$. Current Balance is ${data.payNow.balance}$ `
        } else if (data.errors) {
          msg = data.errors[0].message
        }
        Dialog.create({
          title: 'Alert',
          message: msg,
        })
        return data
      })
      .catch(err => {
        _procError(err)
      })
      .finally(() => commit('setIsLoading', false))
  } else _alert('Please login first!', 'warning')
}
