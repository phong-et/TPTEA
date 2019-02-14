import {_get, _procError} from '../../util/common'
export const fetchAdminModifiers = ({commit}) => {
  _get(`{
    fetchAdminModifiers {
      id
      name
      price
      isDefault
      groupType
      groupTitle
    }
  }`)
    .then(({data}) => {
      commit('setRecs', data.fetchAdminModifiers)
    })
    .catch(err => {
      _procError(err)
    })
}
