const OrderStatus = `
  type OrderStatus {
    id: Int
    name: String
    notes: String
  }
  input OrderStatusInput {
    name: String
    notes: String
  }
`
export default OrderStatus
