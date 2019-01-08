import {Order, OrderDetail, Menu, Modifier, sequelize} from '../../models'
import {_auth} from '../../util'
import _ from 'lodash'

async function calcOrderDetailPrice(orderDetail, menuPrice) {
  let modifiersPrice = 0
  try {
    // menuPrice = menus.find(menu => menu.get('id') === orderDetail.menuId).get('price')
    modifiersPrice = await fetchModifersPrice(orderDetail.modifierIds)
    return (parseFloat(menuPrice) + modifiersPrice) * orderDetail.quantity
  } catch (error) {
    throw new Error(error.message)
  }
}

async function fetchModifersPrice(modifierIds) {
  try {
    let modifiers = await Modifier.findAll({where: {id: modifierIds}})
    return _.sumBy(modifiers, m => {
      return parseFloat(m.price)
    })
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
              let menuIds = input.orderDetails.map(orderDetail => orderDetail.menuId)
              let menus = await Menu.findAll({where: {id: menuIds}})
              // let arrModifierIds = input.orderDetails.map(orderDetail => orderDetail.modifierIds)
              // let modifierIds = [].concat.apply([], arrModifierIds)
              // let modifiers = await Modifier.findAll({where: {id: modifierIds}})
              await Promise.all(
                input.orderDetails.map(async orderDetail => {
                  orderDetail.orderId = id
                  let menuPrice = menus.find(menu => menu.get('id') === orderDetail.menuId).get('price')
                  orderDetail.price = await calcOrderDetailPrice(orderDetail, menuPrice)
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
