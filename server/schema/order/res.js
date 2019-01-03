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
    console.log('menuPrice:%s', menuPrice)
    modifiersPrice = await fetchModifersPrice(orderDetail.modifierIds)
    console.log('modifiersPrice:%s', modifiersPrice)
    return (menuPrice + modifiersPrice) * orderDetail.quantity
  } catch (error) {
    throw new Error(error.message)
  }
}

async function fetchMenuPrice(menuId) {
  try {
    let menu = await Menu.findOne({where: {id: menuId}})
    return menu.get('price')
  } catch (error) {
    throw new Error(error.message)
  }
}
async function fetchModifersPrice(modifierIds) {
  try {
    var prices = 0
    await Promise.all(
      modifierIds.map(async modifierId => {
        let price = await Modifier.findOne({where: {id: modifierId}}).get('price')
        prices += parseFloat(price)
      })
    )
    return prices
  } catch (error) {
    throw new Error(error.message)
  }
}
const resolvers = {
  RootQuery: {},
  RootMutation: {
    async placeOrder(_, {input}, {loggedInUser}) {
      try {
        _auth(loggedInUser)
        return await Order.create(input).then(async ({id}) => {
          console.log(input)
          console.log(id)
          let orderDetailPrice
          // input.orderDetails.forEach((e, index) => {
          //   input.orderDetails[index].orderId = id
          //   let price =  calcOrderDetailPrice(e)
          //   console.log(price)
          //   input.orderDetails[index].price = price
          // })
          await Promise.all(
            input.orderDetails.map(async (orderDetail, index) => {
              orderDetailPrice = await calcOrderDetailPrice(orderDetail)
              console.log(orderDetailPrice)
              input.orderDetails[index].price = orderDetailPrice
            })
          )
          console.log(input.orderDetails)
          // return await OrderDetail.bulkCreate(input.orderDetails).then(orderId => orderId)
        })
      } catch (error) {
        throw new Error(error.message)
      }
    },
  },
}
export default resolvers
