const Order = `
  type PlaceOrderMethod {
    storeId: Int
    isStorePickUp: Boolean
    receivingTime: Date
    deliveryAddress: String
    deliveryContact: String
  }
  input PlaceOrderMethodInput {
    storeId: Int
    isStorePickUp: Boolean
    receivingTime: Date
    deliveryAddress: String
    deliveryContact: String
  }
  type Order {
    id: Int
    customerId: Int
    placeOrderMethod: PlaceOrderMethod 
    orderDetails: [OrderDetail]
  }
  input OrderInput {
    customerId: Int!
    placeOrderMethod: PlaceOrderMethodInput
    orderDetails: [OrderDetailInput]
  }
`
export default Order
