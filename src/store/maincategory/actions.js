import {_get, _procError} from '../../util/common'

export const fetchRecs = ({commit}) => {
  _get(`{
    listMainCategories {
      id
      name
      desc
      img
    }
  }`)
    .then(({data}) => {
      commit('setRecs', data.listMainCategories)
    })
    .catch(err => {
      _procError(err)
    })
}
