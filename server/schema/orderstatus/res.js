import {Status} from '../../models'
const resolvers = {
  RootQuery: {
    async fetchOrderStatuses() {
      return await Status.findAll()
    },
  },
  RootMutation: {},
}
export default resolvers
