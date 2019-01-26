import {_procError, _get, _procAlert} from '../../util/common'
export const fetchOrders = ({commit}) => {
  commit('setIsLoading', true)
  _get(`{
    fetchOrders {
      id
      isStorePickUp
      receivingTime
      deliveryAddress
      deliveryContact
      totalAmount
      orderStatusId      
      Store {
        id
        name
      }
      Customer {
        id
        name
      }
      OrderStatus {
        id
        name
      }
      OrderDetails {
        id
      }
    }
  }`)
    .then(({data}) => {
      _procAlert(data, true)
      console.log(data.fetchOrders)
      data.fetchOrders = data.fetchOrders.map(order => {
        order.customerName = order.Customer.name
        order.storeName = order.Store.name
        order.status = order.OrderStatus.name
      })
      commit('setRecs', data.fetchOrders)
      commit('setIsLoading', false)
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}
