"use strict";
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cart_id: DataTypes.UUID,
      product_id: DataTypes.INTEGER,
      attributes: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      buy_now: DataTypes.BOOLEAN,
      added_on: DataTypes.DATE
    },
    {
      tableName: "shopping_cart"
    }
  );

  Cart.associate = function(models) {
    Cart.belongsTo(models.Product, {
      foreignKey: "product_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      targetKey: "product_id"
    });
  };
  return Cart;
};
