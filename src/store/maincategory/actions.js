import {_get, _procError} from '../../util/common'

export const fetchRecs = ({commit}) => {
  _get(`{
    fetchMainCategories {
      id
      name
      desc
      img
    }
  }`)
    .then(({data}) => {
      commit('setRecs', data.fetchMainCategories)
    })
    .catch(err => {
      _procError(err)
    })
}
