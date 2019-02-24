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
          Dialog.create({
            title: 'Confirm',
            message: 'Do you want pay now ?',
            ok: 'Agree',
            cancel: 'Disagree',
          })
            .then(() => {
              console.log('agree')
              dispatch('payNow', data.placeOrder)
            })
            .catch(() => {
              console.log('disagree')
            })
            .finally(() => {
              _procAlert(data, true)
              commit('setRecs', {})
            })
        } else if (data.errors) {
          Dialog.create({
            title: 'Alert',
            message: data.errors[0].message,
            color: 'primary',
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

export const payNow = ({commit}, orderId) => {
  let customer = store().getters['customer/getCustomer']
  if (!_d.isEmpty(customer)) {
    commit('setIsLoading', true)
    _post(
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
          color: 'primary',
        })
      })
      .catch(err => {
        _procError(err)
      })
  } else _alert('Please login first!', 'warning')
}
