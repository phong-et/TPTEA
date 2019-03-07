import {MainCategory, Category} from '../../models'
import {_authAdmin} from '../../util'
const resolvers = {
  RootQuery: {
    async listCategories(_, {input}) {
      let mainCategory = new MainCategory({id: input})
      return await mainCategory.getCategories()
    },
    async fetchAllCategoriesAdmin(_, __, {loggedInUser}) {
      _authAdmin(loggedInUser)
      return await Category.findAll()
    },
  },
  RootMutation: {
    async createCategory(_, {input}, {loggedInUser}) {
      _authAdmin(loggedInUser)
      return await Category.create(input).then(category => category)
    },
    async updateCategory(_, {input}, {loggedInUser}) {
      _authAdmin(loggedInUser)
      return await Category.update(input, {
        where: {
          id: input.id,
        },
      }).then(() => {
        return input
      })
    },
    async deleteCategories(_, {input}, {loggedInUser}) {
      _authAdmin(loggedInUser)
      return await Category.destroy({
        where: {
          id: {
            $in: input,
          },
        },
      })
    },
  },
  Category: {
    async mainCategoryName({mainCategoryId}) {
      return await MainCategory.findOne({where: {id: mainCategoryId}}).get('name')
    },
  },
}
export default resolvers
