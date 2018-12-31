const OrderDetail = `
  type OrderDetail {
    id: Int
    menuId: Int
    modifierIds: [Int]
    quantity: Int
  }
  input OrderDetailInput {
    menuId: Int
    modifierIds: [Int]
    quantity: Int
  }
`
export default OrderDetail
