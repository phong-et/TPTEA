'use strict'
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define(
    'Order',
    {
      customerId: DataTypes.INTEGER,
      deliveryStoreId: DataTypes.INTEGER,
      deliveryAddress: DataTypes.STRING(500),
      deliveryContact: DataTypes.STRING(50),
      deliveryTime: DataTypes.DATE,
      pickUpStoreId: DataTypes.INTEGER,
      pickUpTime: DataTypes.DATE,
      isStorePickUp: DataTypes.BOOLEAN,
      totalAmount: DataTypes.FLOAT,
      orderStatusId: DataTypes.INTEGER,
    },
    {}
  )
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsTo(models.Customer, {
      foreignKey: 'customerId',
    })
    Order.belongsTo(models.Store, {
      foreignKey: 'deliveryStoreId',
    })
    Order.belongsTo(models.Store, {
      foreignKey: 'pickupStoreId',
    })
    Order.belongsTo(models.OrderStatus, {
      foreignKey: 'orderStatusId',
    })
    Order.hasMany(models.OrderDetail, {
      foreignKey: 'orderId',
    })
  }
  return Order
}
