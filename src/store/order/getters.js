export const getIsAuth = state => !!state.token

export const getIsLoading = state => {
  return state.isLoading
}

export const getRecs = state => {
  return state.recs
}

export const getCols = state => {
  return state.cols
}

export const getFields = state => {
  return state.fields
}

export const getTitle = state => {
  return state.title
}

export const getIcon = state => {
  return state.icon
}

export const getSelected = state => {
  return state.selected
}

export const getIsModalOpened = state => {
  return state.isModalOpened
}

export const getEditingRec = state => {
  let placeOrderMethod = {
    address: state.editingRec.isStorePickUp ? state.editingRec.Store.name : state.editingRec.deliveryAddress,
    deliveryContact: state.editingRec.deliveryContact,
    receivingTime: state.editingRec.receivingTime,
    isStorePickUp: state.editingRec.isStorePickUp,
  }
  state.editingRec.placeOrderMethod = placeOrderMethod
  return state.editingRec
}
