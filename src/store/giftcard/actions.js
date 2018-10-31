import {_procError, _post, _get, _procAlert} from '../../util/common'
import _ from 'lodash'

export const fetchGiftCards = ({commit}) => {
  commit('setIsLoading', true)
  _get(`{
    fetchGiftCards {
      id
      code
      username
    }
  }`)
    .then(({data}) => {
      _procAlert(data, true)
      commit('setRecs', data.fetchGiftCards)
      commit('setIsLoading', false)
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}

export const updateGiftCard = ({commit, getters}) => {
  commit('setIsLoading', true)
  _post(
    _.omit(getters.getEditingRec, ['__index']),
    `mutation ($input: [String]) {
      updateGiftCard(input: $input) 
    }`
  )
    .then(({data}) => {
      _procAlert(data)
      commit('setIsLoading', false)
      commit('setIsModalOpened', false)
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}

export function genGiftCard({commit}, payload) {
  commit('setIsLoading', true)
  _post(
    payload,
    `mutation ($input:GenGiftCardInput) {
      genGiftCard(input: $input)
    }`
  )
    .then(({data}) => {
      commit('setIsLoading', false)
      _procAlert(data, 'Generate Successfully!')
      // if (!data.errors) {
      commit('setCurrentGenGiftCardCode', data.genGiftCard)
      // }
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}
