import {_get, _post, _procError, _procAlert} from '../../util/common'
import _ from 'lodash'
export const fetchAdminModifiers = ({commit}) => {
  commit('setIsLoading', true)
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
    .finally(() => commit('setIsLoading', false))
}
export const updateAdminModifier = ({commit, getters}) => {
  commit('setIsLoading', true)
  _post(
    _.omit(getters.getEditingRec, ['__index']),
    `mutation ($input: AdminModifierInput) {
      updateAdminModifier(input: $input) {
        id
        name
        price
        isDefault
        groupType
        groupTitle
      }
    }`
  )
    .then(({data}) => {
      _procAlert(data, true)
      commit('setIsModalOpened', false)
    })
    .catch(err => {
      _procError(err)
    })
    .finally(() => commit('setIsLoading', false))
}
export function createAdminModifier({commit, getters}) {
  commit('setIsLoading', true)
  _post(
    getters.getEditingRec,
    `mutation ($input: AdminModifierInput) {
      createAdminModifier(input: $input) {
        id
        name
        price
        isDefault
        groupType
        groupTitle
      }
    }`
  )
    .then(({data}) => {
      _procAlert(data, true)
      commit('setIsModalOpened', false)
      getters.getRecs.push(data.createAdminModifier)
      commit('setRecs', _.clone(getters.getRecs))
    })
    .catch(err => {
      _procError(err)
    })
    .finally(() => commit('setIsLoading', false))
}
export const delAdminModifiers = ({commit, getters}) => {
  commit('setIsLoading', true)
  let ids = Array.from(getters.getSelected, modifier => modifier.id)
  _post(
    ids,
    `mutation ($input: [Int]) {
      deleteAdminModifiers(input: $input)
    }`
  )
    .then(({data}) => {
      _procAlert(data, true)
      _.remove(getters.getRecs, rec => {
        return ids.includes(rec.id)
      })
      // clear selection
      commit('setSelected', [])
      // reactive the grid with new recs
      commit('setRecs', _.clone(getters.getRecs))
    })
    .catch(err => {
      _procError(err)
    })
    .finally(() => commit('setIsLoading', false))
}
