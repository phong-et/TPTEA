import {_get, _procError} from '../../util/common'
export const fetchRecs = ({commit, getters}) => {
  if (getters.getRecs.length === 0) {
    return _get(`{
    fetchAllStores {
      id
      name
      address
      phone
      lat
      lng
    }
  }`)
      .then(({data}) => {
        commit('setRecs', data.fetchAllStores)
      })
      .catch(err => {
        _procError(err)
      })
  }
}
