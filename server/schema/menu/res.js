import {Category, Menu, sequelize} from '../../models'
import _d from 'lodash'
import {_authAdmin} from '../../util'
const resolvers = {
  RootQuery: {
    async listMenus(_, {input}) {
      var cat = new Category({id: input})
      return await cat.getMenus()
    },
    async fetchAllMenus() {
      return await Menu.findAll()
    },
  },
  RootMutation: {
    async createMenu(_, {input}, {loggedInUser}) {
      _authAdmin(loggedInUser)
      return sequelize.transaction(t => {
        return Menu.create(input, {transaction: t}).then(menu => {
          return menu.addModifiers(input.modifierIds, {transaction: t}).then(() => {
            return menu
          })
        })
      })
    },
    async updateMenu(_, {input}, {loggedInUser}) {
      _authAdmin(loggedInUser)
      return sequelize.transaction(t => {
        return Menu.update(input, {where: {id: input.id}, transaction: t}).then(() => {
          let menu = new Menu(input)
          return menu.setModifiers(input.modifierIds, {transaction: t}).then(() => {
            return menu
          })
        })
      })
    },
    async deleteMenus(_, {input}, {loggedInUser}) {
      _authAdmin(loggedInUser)
      return await Menu.destroy({
        where: {
          id: {
            $in: input,
          },
        },
      }).catch(err => {
        if (err.parent.errno === 1451) throw new Error('This menu is linked to another table')
        else throw new Error(err)
      })
    },
  },
  Menu: {
    async mainCategoryId({categoryId}) {
      return await Category.findOne({where: {id: categoryId}}).get('mainCategoryId')
    },
    async modifierIds(menu) {
      let modifiers = await menu.getModifiers()
      return _d.map(modifiers, 'id')
    },
  },
}
export default resolvers
