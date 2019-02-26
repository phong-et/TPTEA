const Menu = `
  type Menu {
    id: Int
    name: String
    price: String
    desc: String
    img: String
    categoryId: Int
    mainCategoryId: Int
    modifierIds: [Int]
  }
  input MenuInput {
    id: Int
    name: String!
    price: String!
    desc: String
    img: String
    categoryId: Int
    modifierIds: [Int]
  }
`
export default Menu
