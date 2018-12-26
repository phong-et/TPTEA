
import {MainCategory} from '../../models'
const resolvers = {
  RootQuery: {
    async fetchMainCategories(_, {input}) {
      return await MainCategory.findAll()
    },
  },
  RootMutation: {},
}
export default resolvers
