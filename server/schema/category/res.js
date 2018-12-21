import {MainCategory} from '../../models'
const resolvers = {
  RootQuery: {
    async listCategories(_, {input}) {
      let mainCategory = new MainCategory({id: input})
      return await mainCategory.getCategories()
    },
  },
  RootMutation: {},
}
export default resolvers
