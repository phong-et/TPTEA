export default {
  recs: {},
  isLoading: false,
  placeOrderMethod: {
    deliveryAddress: '',
    deliveryContact: '',
    receivingTime: new Date().setMinutes(new Date().getMinutes() + 30),
    isStorePickUp: false,
    storeId: null,
  },
  customerOrders: [],
}
