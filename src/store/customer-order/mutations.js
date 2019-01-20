import _d from 'lodash'
import store from '../index'
let groupMenuModifiers = data => {
  let groupByMenuId = _d
    .chain(data)
    .groupBy('menuId')
    .map((dataMenuId, menuId) =>
      _d
        .chain(dataMenuId)
        .groupBy('modifierIds')
        .map((dataModifierId, modifierIds) => ({
          menuId: parseInt(menuId),
          modifierIds: modifierIds === '' ? [] : modifierIds.split(',').map(Number),
          quantity: _d.sumBy(dataModifierId, 'quantity'),
          price: _d.sumBy(dataModifierId, 'price'),
        }))
        .value()
    )
    .value()
  return [].concat(...groupByMenuId)
}
export const setRecs = (state, payload) => {
  if (!_d.isEmpty(payload)) {
    let newModifier = []
    if (state.recs.orderDetails) {
      newModifier = _d.concat(state.recs.orderDetails, payload)
    } else newModifier = [payload]
    state.recs = {
      customerId: store().getters['customer/getCustomer'].id,
      orderDetails: groupMenuModifiers(newModifier),
    }
  } else state.recs = payload
}
export const removeOrderMenu = (state, payload) => {
  let currentOrderDetails = state.recs.orderDetails
  _d.remove(currentOrderDetails, ({menuId, modifierIds}) => {
    return menuId === payload.menuId && modifierIds === payload.modifierIds
  })
  state.recs = {
    customerId: store().getters['customer/getCustomer'].id,
    orderDetails: currentOrderDetails,
  }
}
export const setIsLoading = (state, payload) => {
  state.isLoading = payload
}
export const setPlaceOrderMethod = (state, payload) => {
  state.placeOrderMethod = payload
}
export const setCustomerOrders = (state, payload) => {
  state.customerOrders = payload
}
