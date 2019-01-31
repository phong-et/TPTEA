import {_get, _procError} from '../../util/common'
export const fetchRecs = ({commit, getters}) => {
  if (getters.getRecs.length === 0) {
    return _get(`{
    fetchOrderStatuses {
      id
      name
    }
  }`)
      .then(({data}) => {
        commit('setRecs', data.fetchOrderStatuses)
      })
      .catch(err => {
        _procError(err)
      })
  }
}
