const GiftCard = `
  type GiftCard {
    id: Int
    code: String
    userName: String
    createdAt: Date
  }

  input GiftCardInput {
    id: Int
    code: String!
  }

  input GenGiftCardInput {
    amount: Int!
    expiry: Int!
  }
`
export default GiftCard
