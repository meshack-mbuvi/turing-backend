'use strict';
module.exports = (sequelize, DataTypes) => {
 const ShippingRegion = sequelize.define(
  'ShippingRegion',
  {
   shipping_region_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
   },
   shipping_region: DataTypes.STRING,
  },
  { tableName: 'shipping_region' }
 );
 ShippingRegion.associate = function(models) {
  // associations can be defined here
 };
 return ShippingRegion;
};
