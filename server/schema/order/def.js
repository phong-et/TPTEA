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
    storeId: Int
    isStorePickUp: Boolean
    receivingTime: Date
    deliveryAddress: String
    deliveryContact: String
    totalAmount: Float
    orderStatusId: Int
    orderDetails: [OrderDetail]
  }
  input OrderInput {
    customerId: Int!
    placeOrderMethod: PlaceOrderMethodInput
    orderDetails: [OrderDetailInput]
  }
`
export default Order
