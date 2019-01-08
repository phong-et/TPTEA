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
          menuId,
          modifierIds: modifierIds.split(',').map(Number),
          quantity: _d.sumBy(dataModifierId, 'quantity'),
          price: _d.sumBy(dataModifierId, 'price'),
        }))
        .value()
    )
    .value()
  return [].concat(...groupByMenuId)
}
export const setRecs = (state, payload) => {
  let newModifier = []
  if (state.recs.orderDetail) {
    newModifier = _d.concat(state.recs.orderDetail, payload)
  } else newModifier = [payload]
  state.recs = {
    customerId: store().getters['customer/getCustomer'].id,
    orderDetail: groupMenuModifiers(newModifier),
  }
}
