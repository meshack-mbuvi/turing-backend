'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define (
    'ProductCategory',
    {
      name: DataTypes.STRING,
    },
    {
      tableName: 'product_category',
    }
  );
  ProductCategory.associate = function (models) {
    // associations can be defined here
  };
  return ProductCategory;
};
