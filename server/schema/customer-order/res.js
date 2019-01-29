import {_auth} from '../../util'
import {Customer} from '../../models'
const resolvers = {
  RootQuery: {
    async fetchCustomerOrders(_, {input}, {loggedInUser}) {
      _auth(loggedInUser)
      let customer = new Customer({id: input})
      return await customer.getOrders({order: [['createdAt', 'DESC']]})
    },
  },
  RootMutation: {},
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
}
export default resolvers
