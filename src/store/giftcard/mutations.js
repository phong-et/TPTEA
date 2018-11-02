export const setIsLoading = (state, payload) => {
  state.isLoading = payload
}

export const setCurrentGenGiftCardCode = (state, payload) => {
  state.currentGiftCardCode = payload
  state.isModalQRCodeOpened = true
}

export const setRecs = (state, payload) => {
  state.recs = payload
}

export const setSelected = (state, payload) => {
  state.selected = payload
}

export const setEditingRec = state => {
  state.isModalOpened = true
}

export const discardEditingRec = state => {
  state.isModalOpened = false
}

export const setIsModalOpened = (state, payload) => {
  state.isModalOpened = payload
}

export const setIsModalQRCodeOpened = (state, payload) => {
  state.isModalQRCodeOpened = payload
}
