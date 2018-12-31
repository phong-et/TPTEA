import {Order, OrderDetail, Menu, Modifier} from '../../models'
import {_auth} from '../../util'

/**
 * 
 * @param {*} orderDetails
 * {
 *    menuId: Int
      modifierIds: [Int]
      quantity: Int
 * }
 */
async function calcOrderDetailPrice(orderDetail) {
  let menuPrice = 0,
    modifiersPrice = 0
  try {
    menuPrice = await fetchMenuPrice(orderDetail.menuId)
    modifiersPrice = await fetchModifersPrice(orderDetail.modifierIds)
    return (menuPrice + modifiersPrice) * orderDetail.quantity
  } catch (error) {
    throw new Error(error.message)
  }
}

async function fetchMenuPrice(menuId) {
  try {
    let menu = await Menu.findOne({where: {menuId}})
    return menu.price
  } catch (error) {
    throw new Error(error.message)
  }
}
async function fetchModifersPrice(modifierIds) {
  var sumPrice = 0
  try {
    modifierIds.forEach(async modifierId => {
      var modifier = await Modifier.findOne({where: {modifierId}})
      sumPrice += modifier.price
    })
    return sumPrice
  } catch (error) {
    throw new Error(error.message)
  }
}
const resolvers = {
  RootQuery: {
    async placeOrder(_, {input}, {loggedInUser}) {
      try {
        _auth(loggedInUser)
        return await Order.create(input).then(async orderId => {
          input.orderDetails.forEach((e, index) => {
            input.orderDetails[index].orderId = orderId
            input.orderDetails[index].price = calcOrderDetailPrice(e)
          })
          return await OrderDetail.create(input.orderDetails).then(orderId => orderId)
        })
      } catch (error) {
        throw new Error(error.message)
      }
    },
  },
  RootMutation: {},
}
export default resolvers
