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
    let price = await Menu.findOne({where: {id: menuId}}).get('price')
    return parseFloat(price)
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
        console.log(input)
        return await Order.create(input).then(async ({id}) => {
          await Promise.all(
            input.orderDetails.map(async (orderDetail, index) => {
              input.orderDetails[index].orderId = id
              input.orderDetails[index].price = await calcOrderDetailPrice(orderDetail)
              input.orderDetails[index].modifierIds = input.orderDetails[index].modifierIds.toString()
            })
          )
          console.log(input.orderDetails)
          await OrderDetail.bulkCreate(input.orderDetails)
          return 1
        })
      } catch (error) {
        // console.log(error)

        throw new Error(error)
      }
    },
  },
}
export default resolvers
