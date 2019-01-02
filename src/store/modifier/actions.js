import {_post, _procError} from '../../util/common'
import _ from 'lodash'
export const fetchModifiers = ({commit}, payload) => {
  _post(
    payload,
    `query ($input: MenuInput) {
      fetchModifiers(input: $input) {
        data {
          id
          name
          price
          isDefault
        }
        groupType
        groupTitle
      }
    }`
  )
    .then(({data}) => {
      commit(
        'setRecs',
        _.sortBy(data.fetchModifiers, modifier => {
          return modifier.groupTitle
        })
      )
    })
    .catch(err => {
      _procError(err)
    })
}
