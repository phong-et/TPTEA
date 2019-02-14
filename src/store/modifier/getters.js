import _d from 'lodash'

export const getRecs = state => {
  return state.recs
}
export const getCurrentMenuModifiers = state => {
  return state.currentMenuModifiers
}
export const getAllModifiers = state => {
  return state.allModifiers
}
export const getModifiers = state => modifierIds => {
  return _d.filter(state.allModifiers, modifier => {
    return modifierIds.includes(modifier.id)
  })
}
export const getCols = state => {
  return state.cols
}
export const getIsLoading = state => {
  return state.isLoading
}
export const getTitle = state => {
  return state.title
}
export const getIcon = state => {
  return state.icon
}
