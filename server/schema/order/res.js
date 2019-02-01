import {Order, OrderDetail, Menu, Modifier, sequelize, Store, Customer, OrderStatus} from '../../models'
import {_auth, _authAdmin} from '../../util'
import _d from 'lodash'
const fetch = require('node-fetch')
const apiKey = 'AIzaSyCEUChDraEFCd3f79AK2xSh1FFDDJUpnWw'
const MAX_STORE_DISTANCE = 20000
const DEFAULT_ORDER_STATUS = 1
//#region function support for "placeOrder" resolver
function formatOrderInput(input) {
  let formatedInput = {...input, ...input.placeOrderMethod}
  delete formatedInput.placeOrderMethod
  return formatedInput
}
async function createOrder(input) {
  try {
    let order = formatOrderInput(input)
    if (!order.isStorePickUp) {
      order.storeId = await findNearestStoreId(order.deliveryAddress)
    }
    order.orderStatusId = DEFAULT_ORDER_STATUS

    let orderDetails = order.orderDetails
    let menuIds = orderDetails.map(orderDetail => orderDetail.menuId)
    let menus = await Menu.findAll({where: {id: menuIds}})

    let arrModifierIds = orderDetails.map(orderDetail => orderDetail.modifierIds)
    let modifierIds = [...new Set([].concat.apply([], arrModifierIds))]
    let modifiers = await Modifier.findAll({where: {id: modifierIds}})

    let totalAmount = 0
    orderDetails.map(orderDetail => {
      let menuPrice = menus.find(menu => menu.get('id') === orderDetail.menuId).get('price')
      let modifiersPrice = getModifiersPrice(modifiers, orderDetail.modifierIds)
      orderDetail.price = (parseFloat(menuPrice) + modifiersPrice) * orderDetail.quantity
      orderDetail.modifierIds = orderDetail.modifierIds.toString()
      totalAmount += orderDetail.price
    })
    order.totalAmount = totalAmount

    return order
  } catch (error) {
    throw new Error(error.message)
  }
}
function updateOrderDetailsWithOrderId(orderDetails, orderId) {
  orderDetails.map(orderDetail => {
    orderDetail.orderId = orderId
  })
  return orderDetails
}
function getModifiersPrice(modifiers, modifierIds) {
  try {
    let modifiersPrice = 0
    modifierIds.forEach(modifierId => {
      let modifierPrice = modifiers.find(modifier => modifier.get('id') === modifierId).get('price')
      modifiersPrice += parseFloat(modifierPrice)
    })
    return modifiersPrice
  } catch (error) {
    throw new Error(error.message)
  }
}
async function findNearestStoreId(deliveryAddress) {
  try {
    let stores = await Store.findAll()
    let storeAddresses = getStoreAddresses(stores)
    let url =
      'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + deliveryAddress + '&destinations=' + storeAddresses + '&key=' + apiKey
    let distances = await fetch(url).then(async res => await res.json())
    let storeName = findNearestStoreName(distances)
    return _d.find(stores, {dataValues: {gmapAddress: storeName}}).get('id')
  } catch (error) {
    throw new Error(error)
  }
}
function findNearestStoreName(distances) {
  let elements = _d.map(distances.rows[0].elements, 'distance.value')
  let minIndex = elements.indexOf(_d.min(elements))
  let nearestDistance = elements[minIndex]
  if (nearestDistance === undefined) {
    throw new Error('No nearest store found !')
  } else if (nearestDistance > MAX_STORE_DISTANCE) {
    throw new Error(
      'The distance from the nearest store is: ' +
        Math.floor(nearestDistance / 1000) +
        'km, which is more than ' +
        Math.floor(MAX_STORE_DISTANCE / 1000) +
        'km'
    )
  }
  return distances.destination_addresses[minIndex]
}
function getStoreAddresses(stores) {
  return _d.map(stores, 'dataValues.gmapAddress').join('|')
}
//#endregion function support for "placeOrder" resolver

const resolvers = {
  RootQuery: {
    async fetchOrders(_, __, {loggedInUser}) {
      _authAdmin(loggedInUser)
      let orders = await Order.findAll({
        include: [Store, Customer, OrderDetail, OrderStatus],
      })
      return orders
    },
    async fetchOrdersByStoreId(_, {input}, {loggedInUser}) {
      _authAdmin(loggedInUser)
      let orders = await Order.findAll({
        include: [Store, Customer, OrderDetail, OrderStatus],
        where: {storeId: input},
      })
      return orders
    },
  },
  RootMutation: {
    async placeOrder(_, {input}, {loggedInUser}) {
      _auth(loggedInUser)
      try {
        return sequelize
          .transaction(async t => {
            let order = await createOrder(input)
            return await Order.create(order, {transaction: t}).then(async createdOrder => {
              await OrderDetail.bulkCreate(updateOrderDetailsWithOrderId(order.orderDetails, createdOrder.get('id')), {transaction: t})
              return createdOrder
            })
          })
          .then(createdOrder => {
            return createdOrder.get('id')
          })
          .catch(err => {
            throw new Error(err)
          })
      } catch (error) {
        throw new Error(error.message)
      }
    },
    async updateOrderStatus(_, {input}, {loggedInUser}) {
      _authAdmin(loggedInUser)
      try {
        return sequelize
          .transaction(async t => {
            return await Order.update({orderStatusId: input.orderStatusId}, {where: {id: input.orderId}}, {transaction: t}).then(async rowUpdated => {
              return rowUpdated
            })
          })
          .then(rowUpdated => {
            console.log(rowUpdated)
            return rowUpdated
          })
          .catch(err => {
            throw new Error(err)
          })
      } catch (error) {
        throw new Error(error.message)
      }
    },
  },
}

export default resolvers
