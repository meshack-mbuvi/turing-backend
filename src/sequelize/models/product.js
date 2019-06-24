'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define (
    'Product',
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.DECIMAL (10, 2),
      discounted_price: DataTypes.DECIMAL (10, 2),
      thumbnail: DataTypes.STRING,
      image: DataTypes.STRING,
      image_2: DataTypes.STRING,
      display: DataTypes.DECIMAL (10, 2),
    },
    {
      tableName: 'product',
    }
  );
  Product.associate = function (models) {
    Product.belongsToMany (models.Category, {
      through: 'product_category',
      foreignKey: 'product_id',
    });

    Product.hasMany (models.Review, {
      foreignKey: 'review_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: 'reviews',
    });

    Product.belongsToMany (models.Cart, {
      through: 'shopping_cart',
      foreignKey: 'cart_id',
    });

    Product.belongsToMany (models.AttributeValue, {
      through: 'product_attribute',
      foreignKey: 'product_id',
    });
  };
  return Product;
};
