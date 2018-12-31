const Order = `
  type Order {
    id: Int
    customerId: Int
    storeId: Int
    deliveryAddress: String    
    createdAt: Date
    OrderDetails: [OrderDetail]
  }
  input OrderInput {
    customerId: Int!
    storeId: Int!
    deliveryAddress: String!
    OrderDetails: [OrderDetail]
  }
`
export default Order
