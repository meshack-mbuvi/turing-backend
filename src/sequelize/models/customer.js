'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
  'Customer',
    {
      customer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: DataTypes.STRING,
      day_phone: DataTypes.STRING,
      eve_phone: DataTypes.STRING,
      mob_phone: DataTypes.STRING,
      stripe_customer_id: DataTypes.STRING,
      credit_card: DataTypes.STRING
    },
  { tableName: 'customer' }
 );

  Customer.associate = function (models) {
    Customer.hasMany(models.Orders, {
      foreignKey: 'order_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: 'orders'
    });
  };
  return Customer;
};
