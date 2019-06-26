'use strict';
module.exports = (sequelize, DataTypes) => {
 const Orders = sequelize.define(
  'Orders',
  {
   order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
   },
   total_amount: DataTypes.DECIMAL(10, 2),
   created_on: DataTypes.DATE,
   shipped_on: DataTypes.DATE,
   status: DataTypes.INTEGER,
   comments: DataTypes.STRING,
   customer_id: DataTypes.INTEGER,
   auth_code: DataTypes.STRING,
   reference: DataTypes.STRING,
   shipping_id: DataTypes.INTEGER,
   tax_id: DataTypes.INTEGER,
  },
  {
   tableName: 'orders',
  }
 );

 Orders.associate = function(models) {
  Orders.belongsTo(models.Customer, {
   foreignKey: 'customer_id',
   onDelete: 'CASCADE',
   onUpdate: 'CASCADE',
  });
 };
 return Orders;
};
