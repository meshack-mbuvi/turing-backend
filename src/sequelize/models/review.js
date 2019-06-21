'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define (
    'Review',
    {
      review_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customer_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      review: DataTypes.STRING,
      rating: DataTypes.SMALLINT,
      created_on: DataTypes.DATE,
    },
    {
      tableName: 'review',
    }
  );
  Review.associate = function (models) {
    Review.belongsTo (models.Product, {
      foreignKey: 'product_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: 'product',
    });
  };
  return Review;
};
