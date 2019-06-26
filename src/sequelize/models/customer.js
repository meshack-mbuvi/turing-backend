'use strict';
module.exports = (sequelize, DataTypes) => {
 const Customer = sequelize.define(
  'Customer',
  {
   customer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
   },
   name: DataTypes.STRING,
   email: {
    type: DataTypes.STRING,
    unique: true,
   },
   password: DataTypes.STRING,
   day_phone: DataTypes.STRING,
   eve_phone: DataTypes.STRING,
   mob_phone: DataTypes.STRING,
   stripe_customer_id: DataTypes.STRING,
   credit_card: DataTypes.STRING,
   address_1: DataTypes.STRING,
   address_2: DataTypes.STRING,
   city: DataTypes.STRING,
   region: DataTypes.STRING,
   postal_code: DataTypes.STRING,
   country: DataTypes.STRING,
   shipping_region_id: DataTypes.INTEGER,
  },
  { tableName: 'customer' }
 );

 Customer.associate = function(models) {
  Customer.hasMany(models.Orders, {
   foreignKey: 'order_id',
   onDelete: 'CASCADE',
   onUpdate: 'CASCADE',
   as: 'orders',
  });

  Customer.belongsTo(models.ShippingRegion, {
   foreignKey: 'shipping_region_id',
   onDelete: 'CASCADE',
   onUpdate: 'CASCADE',
  });
 };

 return Customer;
};
