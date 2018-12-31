const Order = `
  type Order {
    id: Int
    customerId: Int
    storeId: Int
    deliveryAddress: String    
    createdAt: Date
    orderDetails: [OrderDetail]
  }
  input OrderInput {
    customerId: Int!
    storeId: Int!
    deliveryAddress: String!
    orderDetails: [OrderDetailInput]
  }
`
export default Order
