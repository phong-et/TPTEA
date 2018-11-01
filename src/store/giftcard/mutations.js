import _ from 'lodash'
export const setIsLoading = (state, payload) => {
  state.isLoading = payload
}
export const setCurrentGiftCardCode = (state, payload) => {
  state.currentGiftCardCode = payload
}
export const setCurrentGenGiftCardCode = (state, payload) => {
  state.currentGenGiftCardCode = payload
}

export const setEditingRec = (state, payload) => {
  payload.password = ''
  state.editingRec = payload
  state.backupRec = _.clone(payload)
  state.isModalOpened = true
}

export const discardEditingRec = state => {
  _.extend(state.editingRec, state.backupRec)
  state.isModalOpened = false
}

export const setIsModalOpened = (state, payload) => {
  state.isModalOpened = payload
}
