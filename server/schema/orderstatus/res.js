import {OrderStatus} from '../../models'
const resolvers = {
  RootQuery: {
    async fetchOrderStatuses() {
      return await OrderStatus.findAll()
    },
  },
  RootMutation: {},
}
export default resolvers
