/*
export function someAction (context) {
}
*/

import {_post, _get, _procError, _procAlert} from '../../util/common'
import _d from 'lodash'
import store from '../index'
export const fetchRecs = ({commit}, {id}) => {
  _post(
    id,
    `query ($input: Int) {
      listMenus(input: $input) {
        id
        name
        desc
        price
        img
      }
    }`
  )
    .then(({data}) => {
      commit('setRecs', data.listMenus)
    })
    .catch(err => {
      _procError(err)
    })
}

export const fetchAllMenus = ({commit}) => {
  _get(`{
    fetchAllMenus {
      id
      name
      desc
      price
      img
    }
  }`)
    .then(({data}) => {
      commit('setAllMenus', data.fetchAllMenus)
    })
    .catch(err => {
      _procError(err)
    })
}
export const fetchMenus = ({commit}) => {
  commit('setIsLoading', true)
  _get(`{
    fetchAllMenus {
      id
      name
      desc
      price
      img
      categoryId
      mainCategoryId
      modifierIds
    }
  }`)
    .then(({data}) => {
      commit('setIsLoading', false)
      commit('setRecs', data.fetchAllMenus.reverse())
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}
export const createMenu = ({commit, getters}, payload) => {
  let menu = _d.omit(getters.getEditingRec, ['mainCategoryId'])
  commit('setIsLoading', true)
  _post(
    {...menu, img: store().getters['util/getCurrentUploadImageData'], modifierIds: payload},
    `mutation ($input: MenuInput) {
      createMenu(input: $input) {
        id
        name
        price
        desc
        img
        categoryId
        mainCategoryId
        modifierIds
      }
    }`
  )
    .then(({data}) => {
      commit('setIsLoading', false)
      _procAlert(data, true)
      commit('setIsModalOpened', false)
      store().commit('util/setCurrentUploadImageData', '')
      getters.getRecs.unshift(data.createMenu)
      commit('setRecs', _d.clone(getters.getRecs))
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}
export function updateMenu({commit, getters}, payload) {
  commit('setIsLoading', true)
  let menu = _d.omit(getters.getEditingRec, ['__index', 'mainCategoryId'])
  let imgUploadData = store().getters['util/getCurrentUploadImageData']
  if (imgUploadData !== '') {
    menu.img = imgUploadData
  }
  _post(
    {...menu, modifierIds: payload},
    `mutation ($input: MenuInput) {
      updateMenu(input: $input){
        id
        name
        desc
        price
        img
        categoryId
        mainCategoryId
        modifierIds
      }
    }`
  ).then(({data}) => {
    _procAlert(data, true)
    commit('setIsLoading', false)
    _d.forEach(getters.getRecs, (menu, index) => {
      if (menu.id === data.updateMenu.id) {
        getters.getRecs[index] = data.updateMenu
        return false
      }
    })
    commit('setIsModalOpened', false)
    store().commit('util/setCurrentUploadImageData', '')
    commit('setRecs', _d.clone(getters.getRecs))
  })
}
export function delMenus({commit, getters}) {
  commit('setIsLoading', true)
  let ids = Array.from(getters.getSelected, menu => menu.id)
  _post(
    ids,
    `mutation ($input: [Int]) {
      deleteMenus(input: $input)
    }`
  ).then(({data}) => {
    _procAlert(data, true)
    commit('setIsLoading', false)
    if (!data.errors) {
      _d.remove(getters.getRecs, rec => {
        return ids.includes(rec.id)
      })
      commit('setSelected', [])
      commit('setRecs', _d.clone(getters.getRecs))
    }
  })
}
