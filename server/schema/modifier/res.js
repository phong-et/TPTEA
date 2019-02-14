import {Menu, Modifier} from '../../models'
import _d from 'lodash'
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
  RootMutation: {},
}
export default resolvers
