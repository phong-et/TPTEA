export default {
  recs: {},
  isLoading: false,
  placeOrderMethod: {
    deliveryStoreId: null,
    deliveryAddress: '',
    deliveryContact: '',
    deliveryTime: new Date().setMinutes(new Date().getMinutes() + 30),
    pickUpStoreId: 0,
    pickUpTime: new Date().setMinutes(new Date().getMinutes() + 30),
    isStorePickUp: false,
  },
  customerOrders: [],
}
