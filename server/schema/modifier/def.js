const Modifier = `
  type ModifierGroup {
    data: [Modifier]
    groupTitle: String
    groupType: String
  }
  type Modifier {
    id: Int
    name: String
    price: String
    isDefault: Boolean
  }
  type ModifierAdmin {
    id: Int
    name: String
    price: String
    isDefault: Boolean
    groupType
    groupTitle
  }
`
export default Modifier
