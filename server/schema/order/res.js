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
  menuPrice = await getMenuPrice(orderDetail.menuId)
  modifiersPrice = await calcModifersPrice(orderDetail.modifierIds)
  return (menuPrice + modifiersPrice) * orderDetail.quantity
}

async function getMenuPrice(menuId) {
  try {
    let menu = await Menu.findOne({where: {menuId}})
    return menu.price
  } catch (error) {
    throw new Error(error.message)
  }
}
async function calcModifersPrice(modifierIds) {
  var sumPrice = 0
  try {
    modifierIds.forEach(async (modifierId) => {
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
          input.orderDetail.forEach((od, index) => {
            input.orderDetail[index].orderId = orderId
            input.orderDetail[index].price = calcOrderDetailPrice(od)
          })
          return await OrderDetail.create(input.orderDetail).then(orderId => orderId)
        })
      } catch (error) {
        throw new Error(error.message)
      }
    },
  },
  RootMutation: {},
}
export default resolvers
