const CustomerOrder = `
  type CustomerOrder {
    id: Int
    address: String
    orderDate: Date
    orderStatus: String
    totalAmount: String
    isStorePickUp: Boolean
  }
  type HistoryCustomerOrder {
    placeOrderMethod: HistoryPlaceOrderMethod
    customerOrder:[OrderDetail]
  }
`
export default CustomerOrder
