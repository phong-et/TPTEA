import {Menu, Modifier} from '../../models'
import _d from 'lodash'
import {_authAdmin} from '../../util'
const resolvers = {
  RootQuery: {
    async fetchModifiers(_, {input}) {
      let menu = new Menu(input)
      let dataModifiers = await menu.getModifiers()
      return _d
        .chain(dataModifiers)
        .groupBy('groupTitle')
        .map((data, groupTitle) => ({
          data,
          groupTitle,
          groupType: data[0].groupType,
        }))
        .value()
    },
    async fetchAllModifiers() {
      return await Modifier.findAll()
    },
    async fetchAdminModifiers() {
      return await Modifier.findAll()
    },
  },
  RootMutation: {
    async createAdminModifier(_, {input}, {loggedInUser}) {
      _authAdmin(loggedInUser)
      return await Modifier.create(input).then(modifier => modifier)
    },
    async updateAdminModifier(_, {input}, {loggedInUser}) {
      _authAdmin(loggedInUser)
      return await Modifier.update(input, {
        where: {
          id: input.id,
        },
      }).then(() => {
        return input
      })
    },
    async deleteAdminModifiers(_, {input}, {loggedInUser}) {
      _authAdmin(loggedInUser)
      return await Modifier.destroy({
        where: {
          id: {
            $in: input,
          },
        },
      })
    },
  },
}
export default resolvers
