'use strict'
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define(
    'Category',
    {
      name: DataTypes.STRING,
      desc: DataTypes.STRING,
      img: DataTypes.STRING,
    },
    {}
  )
  Category.associate = models => {
    // associations can be defined here
    Category.hasMany(models.Menu, {
      foreignKey: 'categoryId',
    })
  }
  return Category
}
