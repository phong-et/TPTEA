import {Order, OrderDetail, Menu, Modifier, sequelize} from '../../models'
import {_auth} from '../../util'
import _ from 'lodash'

function getOrderDetailPrice(modifiersPrice, menuPrice, quantity) {
  try {
    return (parseFloat(menuPrice) + modifiersPrice) * quantity
  } catch (error) {
    throw new Error(error.message)
  }
}
function getModifersPrice(modifiers, modifierIds) {
  try {
    let modifiersPrice = 0
    modifierIds.forEach(modiferId => {
      let modifierPrice = modifiers.find(modifier => modifier.get('id') === modiferId).get('price')
      modifiersPrice += parseFloat(modifierPrice)
    })
    return modifiersPrice
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
        console.log(input.orderDetails)
        return sequelize
          .transaction(async t => {
            await Order.create(input, {transaction: t}).then(async ({id}) => {
              orderId = id
              let menuIds = input.orderDetails.map(orderDetail => orderDetail.menuId)
              let menus = await Menu.findAll({where: {id: menuIds}})
              let arrModifierIds = input.orderDetails.map(orderDetail => orderDetail.modifierIds)
              let modifierIds = [...new Set([].concat.apply([], arrModifierIds))]
              let modifiers = await Modifier.findAll({where: {id: modifierIds}})
              
              input.orderDetails.map(orderDetail => {
                orderDetail.orderId = id
                let menuPrice = menus.find(menu => menu.get('id') === orderDetail.menuId).get('price')
                let modifiersPrice = getModifersPrice(modifiers, orderDetail.modifierIds)
                orderDetail.price = getOrderDetailPrice(modifiersPrice, menuPrice, orderDetail.quantity)
                orderDetail.modifierIds = orderDetail.modifierIds.toString()
              })
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
