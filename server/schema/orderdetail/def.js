const OrderDetail = `
  type OrderDetail {
    id: Int
    menuId: Int
    modifierIds: [Int]
    quantity: Int
    price: Float
  }
  input OrderDetailInput {
    menuId: Int
    modifierIds: [Int]
    quantity: Int
    price: Float
  }
`
export default OrderDetail
