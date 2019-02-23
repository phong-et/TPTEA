import {_auth} from '../../util'
import {Customer, Order} from '../../models'
const resolvers = {
  RootQuery: {
    async fetchCustomerOrders(_, {input}, {loggedInUser}) {
      _auth(loggedInUser)
      let customer = new Customer({id: input})
      return await customer.getOrders({order: [['createdAt', 'DESC']]})
    },
    async fetchCustomerOrderDetail(_, {input}, {loggedInUser}) {
      _auth(loggedInUser)
      let order = await Order.findOne({where: {id: input}})
      let customerOrder = await order.getOrderDetails()
      return {
        placeOrderMethod: order,
        customerOrder,
      }
    },
  },
  RootMutation: {
    async payNow(_, {input}, {loggedInUser}) {
      _auth(loggedInUser)
      try {
        let order = await Order.findOne({where: {id: input}})
        let totalAmount = order.get('totalAmount')
        let customer = new Customer({id: order.get('customerId')})
        let balance = customer.get('balance')
        if (balance < totalAmount) throw new Error('The balance does not enough to pay this order')
        else {
          balance = balance - totalAmount
          customer.updateAttributes({
            balance: balance,
          })
        }
        return {totalAmount, balance}
      } catch (error) {
        throw new Error(error.message)
      }
    },
  },
  CustomerOrder: {
    async address(customerorder) {
      return customerorder.isStorePickUp ? await customerorder.getStore().get('address') : customerorder.deliveryAddress
    },
    async orderStatus(customerorder) {
      return await customerorder.getOrderStatus().get('name')
    },
    orderDate({createdAt}) {
      return createdAt
    },
  },
  OrderDetail: {
    modifierIds({modifierIds}) {
      return modifierIds.split(',').map(Number)
    },
  },
  HistoryPlaceOrderMethod: {
    async address(historyOrder) {
      return historyOrder.isStorePickUp ? await historyOrder.getStore().get('address') : historyOrder.deliveryAddress
    },
  },
}
export default resolvers
