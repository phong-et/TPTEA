import {_procError, _get, _post, _procAlert} from '../../util/common'
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
      createdAt    
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
        menuId
        modifierIds
        quantity
        price
      }
    }
  }`)
    .then(({data}) => {
      _procAlert(data, true)
      let orders = data.fetchOrders
      if (orders.length > 0) {
        orders.forEach(order => {
          order.customerName = order.Customer.name
          order.storeName = order.Store.name
          order.status = order.OrderStatus.name
          order.isStorePickUp = order.isStorePickUp ? 'Pickup' : 'Delivery '
          order.createdAt = new Date(order.createdAt).toLocaleString()
          order.receivingTime = new Date(order.receivingTime).toLocaleString()
        })
      }
      console.log(data.fetchOrders)
      commit('setRecs', data.fetchOrders)
      commit('setIsLoading', false)
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}

export const fetchOrdersByStoreId = ({commit}, storeId) => {
  _post(
    storeId,
    `query ($input: Int) {
      fetchOrdersByStoreId(input: $input) {
        id
        isStorePickUp
        receivingTime
        deliveryAddress
        deliveryContact
        totalAmount
        orderStatusId
        createdAt    
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
      let orders = data.fetchOrdersByStoreId
      if (orders.length > 0) {
        orders.forEach(order => {
          order.customerName = order.Customer.name
          order.storeName = order.Store.name
          order.status = order.OrderStatus.name
          order.isStorePickUp = order.isStorePickUp ? 'Pickup' : 'Delivery '
          order.createdAt = new Date(order.createdAt).toLocaleString()
          order.receivingTime = new Date(order.receivingTime).toLocaleString()
        })
      }
      console.log(data.fetchOrdersByStoreId)
      commit('setRecs', data.fetchOrdersByStoreId)
      commit('setIsLoading', false)
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}
