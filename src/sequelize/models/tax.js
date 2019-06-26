'use strict';
module.exports = (sequelize, DataTypes) => {
 const Tax = sequelize.define(
  'Tax',
  {
   tax_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
   },
   tax_type: DataTypes.STRING,
   tax_percentage: DataTypes.INTEGER,
  },
  { tableName: 'tax' }
 );
 Tax.associate = function(models) {};
 return Tax;
};
