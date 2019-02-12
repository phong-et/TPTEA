import {_procError, _get, _post, _procAlert} from '../../util/common'
let templateQueryOrders = `
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
`
let renderOrder = orders => {
  if (orders.length > 0) {
    orders.forEach(order => {
      order.customerName = order.Customer.name
      order.storeName = order.Store.name
      order.orderStatusName = order.OrderStatus.name
      order.isStorePickUp = order.isStorePickUp ? 'Pickup' : 'Delivery '
      order.createdAt = new Date(order.createdAt).toLocaleString()
      order.receivingTime = new Date(order.receivingTime).toLocaleString()
    })
  }
  return orders
}
export const fetchOrders = ({commit}) => {
  commit('setIsLoading', true)
  _get(`{
    fetchOrders {
      ${templateQueryOrders}
    }
  }`)
    .then(({data}) => {
      _procAlert(data, true)
      commit('setRecs', renderOrder(data.fetchOrders))
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
        ${templateQueryOrders}
      }
    }`
  )
    .then(({data}) => {
      _procAlert(data, true)
      commit('setRecs', renderOrder(data.fetchOrdersByStoreId))
      commit('setIsLoading', false)
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}
export const updateOrderStatus = ({commit, getters}) => {
  commit('setIsLoading', true)
  _post(
    {orderId: getters.getEditingRec.id, orderStatusId: getters.getEditingRec.OrderStatus.id},
    `mutation ($input: UpdateOrderStatusInput) {
        updateOrderStatus(input: $input)
      }`
  )
    .then(({data}) => {
      _procAlert(data, true)
      commit('setEditingRec', getters.getEditingRec)
      commit('setIsLoading', false)
      commit('setIsModalOpened', false)
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}
