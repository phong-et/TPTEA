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
    isStorePickUp: Boolean
    receivingTime: Date
    deliveryAddress: String
    deliveryContact: String
    totalAmount: Float
    orderStatusId: Int
    Store : Store
    Customer: Customer
    OrderStatus: OrderStatus
    OrderDetails: [OrderDetail]
  }
  input OrderInput {
    customerId: Int!
    placeOrderMethod: PlaceOrderMethodInput
    orderDetails: [OrderDetailInput]
  }
`
export default Order
