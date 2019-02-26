export const getRecs = state => {
  return state.recs
}
export const getCounter = state => {
  return state.counter
}
export const getAllMenus = state => {
  return state.allMenus
}
export const getMenu = state => menuId => {
  return state.allMenus.find(({id}) => {
    return id === menuId
  })
}
export const getCols = state => {
  return state.cols
}
export const getIsLoading = state => {
  return state.isLoading
}
export const getEditingRec = state => {
  return state.editingRec
}
export const getIsModalOpened = state => {
  return state.isModalOpened
}
export const getSelected = state => {
  return state.selected
}
