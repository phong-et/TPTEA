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
        Dialog.create({
          title: 'Confirm',
          message: 'Do you want pay now ?',
          ok: 'Agree',
          cancel: 'Disagree',
        })
          .then(() => {
            console.log('agree')
            dispatch('payNow', {
              orderId: data.placeOrder,
            })
          })
          .catch(() => {
            console.log('disagree')
          })
          .finally(() => {
            _procAlert(data, true)
            commit('setRecs', {})
          })
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
  if (!_d.isEmpty(customer)) {
    commit('setIsLoading', true)
    _post(
      {
        orderId: orderId,
      },
      `mutation ($input: Int) {
        payNow(input: $input)
      }`
    )
      .then(({data}) => {
        _procAlert(data, true)
      })
      .catch(err => {
        _procError(err)
      })
      .finally(() => commit('setIsLoading', false))
  } else _alert('Please login first!', 'warning')
}
