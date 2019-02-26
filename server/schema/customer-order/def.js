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

  type PayNowOutput{
    totalAmount: Float
    balance: Float
  }
`
export default CustomerOrder
