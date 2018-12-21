/*
export function someAction (context) {
}
*/
import {_post, _procError} from '../../util/common'

export const fetchRecs = ({commit}, payload) => {
  _post(
    payload,
    `query ($input: Int) {
      listCategories(input: $input) {
        id
        name
        desc
        img
      }
    }`
  )
    .then(({data}) => {
      commit('setRecs', data.listCategories)
    })
    .catch(err => {
      _procError(err)
    })
}
