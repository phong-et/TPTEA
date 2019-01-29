import {Store} from '../../models'
const resolvers = {
  RootQuery: {
    async fetchAllStores() {
      return await Store.findAll()
    },
  },
  RootMutation: {},
}
export default resolvers
