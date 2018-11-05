import {_procError, _post, _get, _procAlert} from '../../util/common'
import _ from 'lodash'

export const fetchGiftcards = ({commit}) => {
  commit('setIsLoading', true)
  _get(`{
    fetchGiftCards {
      id
      code
      userName
      amount
      expiry
      createdAt
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

export const delGiftcards = ({commit, getters}) => {
  commit('setIsLoading', true)
  let ids = Array.from(getters.getSelected, giftcard => giftcard.id)
  _post(
    ids,
    `mutation ($input: [Int]) {
      deleteGiftCards(input: $input)
    }`
  ).then(({data}) => {
    _procAlert(data, true)
    commit('setIsLoading', false)
    _.remove(getters.getRecs, rec => {
      return ids.includes(rec.id)
    })
    commit('setSelected', [])
    commit('setRecs', _.clone(getters.getRecs))
  })
}

export function createGiftCard({commit, getters}, payload) {
  commit('setIsLoading', true)
  _post(
    payload,
    `mutation ($input:GiftCardInput) {
      createGiftCard(input: $input){
        id
        code
        userName
        amount
        expiry
        createdAt
      }
    }`
  )
    .then(({data}) => {
      commit('setIsLoading', false)
      _procAlert(data, 'Create Successfully!')
      commit('setIsModalOpened', false)
      getters.getRecs.push(data.createGiftCard)
      commit('setRecs', _.clone(getters.getRecs))
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}
