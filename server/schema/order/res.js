import {Order, OrderDetail, Menu, Modifier, sequelize} from '../../models'
import {_auth} from '../../util'
import _ from 'lodash'

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
    // await Promise.all(
    //   modifierIds.map(async modifierId => {
    //     let price = await Modifier.findOne({where: {id: modifierId}}).get('price')
    //     prices += parseFloat(price)
    //   })
    // )
    let modifiers = await Modifier.findAll({where: {id: modifierIds}})
    let prices = _.sumBy(modifiers, m => { return m.price })
    return parseFloat(prices)
  } catch (error) {
    throw new Error(error.message)
  }
}
const resolvers = {
  RootQuery: {},
  RootMutation: {
    async placeOrder(_, {input}, {loggedInUser}) {
      _auth(loggedInUser)
      try {
        let orderId
        return sequelize
          .transaction(async t => {
            await Order.create(input, {transaction: t}).then(async ({id}) => {
              orderId = id
              await Promise.all(
                input.orderDetails.map(async orderDetail => {
                  orderDetail.orderId = id
                  orderDetail.price = await calcOrderDetailPrice(orderDetail)
                  orderDetail.modifierIds = orderDetail.modifierIds.toString()
                })
              )
              await OrderDetail.bulkCreate(input.orderDetails, {transaction: t})
            })
          })
          .then(() => {
            return orderId
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
