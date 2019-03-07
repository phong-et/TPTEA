import {_get, _procError} from '../../util/common'
import store from '../index'
let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/hriwalxwi/upload'
let CLOUDINARY_UPLOAD_PRESET = 'kynztq5c'
export const fetchOrderSystemData = ({commit}) => {
  if (!store().getters['maincategory/getMainCategoriesData'].length) {
    commit('setIsOrderSystemLoading', true)
    return _get(`{
    fetchOrderSystemData {
      mainCategories {
        id
        name
        desc
        img
      }
      categories {
        id
        name
        desc
        img
        mainCategoryName
        mainCategoryId
      }
      menus {
        id
        name
        price
        desc
        img
        categoryId
        mainCategoryId
        modifierIds
      }
      modifiers {
        id
        name
        price
        isDefault
        groupType
        groupTitle
      }
    }
  }`)
      .then(({data}) => {
        let {mainCategories, categories, menus, modifiers} = data.fetchOrderSystemData
        store().commit('maincategory/setmainCategoriesData', mainCategories)
        store().commit('category/setCategoriesData', categories)
        store().commit('menu/setMenusData', menus)
        store().commit('modifier/setModifiersData', modifiers)
        commit('setIsOrderSystemLoading', false)
      })
      .catch(err => {
        _procError(err)
        commit('setIsOrderSystemLoading', false)
      })
  }
}
export async function cloudinaryUpload({commit}, file) {
  let xhr = new XMLHttpRequest()
  let fd = new FormData()
  xhr.open('POST', CLOUDINARY_URL, true)
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
  fd.append('file', file)
  return new Promise(resolve => {
    xhr.upload.addEventListener('progress', e => {
      let progress = Math.round((e.loaded * 100.0) / e.total)
      commit('setUploadPercentage', progress)
    })
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let response = JSON.parse(xhr.responseText)
        commit('setUploadPercentage', 0)
        resolve(response.secure_url)
      }
    }
    xhr.send(fd)
  })
}
