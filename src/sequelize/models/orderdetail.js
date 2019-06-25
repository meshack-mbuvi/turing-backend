'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define(
  'OrderDetail',
    {
      item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      order_id: {
        type: DataTypes.INTEGER
      },
      product_id: DataTypes.INTEGER,
      attributes: DataTypes.STRING,
      product_name: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      unit_cost: DataTypes.DECIMAL(10, 2)
    },
    {
      tableName: 'order_detail'
    }
 );

  OrderDetail.associate = function (models) {
    OrderDetail.belongsTo(models.Orders, {
      foreignKey: 'order_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return OrderDetail;
};
