import {_post, _procError, _procAlert, _alert} from '../../util/common'
import store from '../index'
import _d from 'lodash'
export const placeOrder = ({commit, getters}) => {
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
        _procAlert(data, true)
        commit('setRecs', {})
        commit('setIsLoading', false)
      })
      .catch(err => {
        _procError(err)
        commit('setIsLoading', false)
      })
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
