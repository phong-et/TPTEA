import {Menu} from '../../models'
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
  },
  RootMutation: {},
}
export default resolvers
