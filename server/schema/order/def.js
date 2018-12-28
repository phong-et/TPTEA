const Order = `
  type OrderDetail {
    id: Int
    menuId: Int
    modifierIds: [Int]
    quantity: Int
  }
  type Order {
    id: Int
    customerId: Int
    storeId: Int
    deliveryAddress: String    
    createdAt: Date
    OrderDetail: [OrderDetail]
  }

  input OrderDetailInput {
    menuId: Int
    modifierIds: [Int]
    quantity: Int
  }
  input OrderInput {
    customerId: Int!
    storeId: Int!
    deliveryAddress: String!
    OrderDetail: [OrderDetail]
  }
`
export default Order
