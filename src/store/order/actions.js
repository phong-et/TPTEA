import {_procError, _get, _procAlert} from '../../util/common'
export const fetchOrders = ({commit}) => {
  commit('setIsLoading', true)
  _get(`{
    fetchOrders {
      id
      customerId
      storeId
      isStorePickUp
      receivingTime
      deliveryAddress
      deliveryContact
      totalAmount
      orderStatusId
    }
  }`)
    .then(({data}) => {
      _procAlert(data, true)
      commit('setRecs', data.fetchOrders)
      commit('setIsLoading', false)
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}
