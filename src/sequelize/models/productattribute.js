'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductAttribute = sequelize.define (
    'ProductAttribute',
    {
      product_id: {
        type: DataTypes.INTEGER,
      },
      attribute_value_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'product_attribute',
    }
  );
  ProductAttribute.associate = function (models) {
    // associations can be defined here
  };
  return ProductAttribute;
};
