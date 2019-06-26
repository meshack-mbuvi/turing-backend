'use strict';
module.exports = (sequelize, DataTypes) => {
 const ShippingRegion = sequelize.define(
  'shipping',
  {
   shipping_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
   },
   shipping_type: DataTypes.STRING,
   shipping_cost: DataTypes.DECIMAL(10, 2),
   shipping_region_id: DataTypes.INTEGER,
  },
  { tableName: 'shipping' }
 );
 ShippingRegion.associate = function(models) {
  // associations can be defined here
 };
 return ShippingRegion;
};
