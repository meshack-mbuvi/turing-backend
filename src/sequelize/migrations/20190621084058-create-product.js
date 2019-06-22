'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable ('product', {
      product_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      price: {
        type: Sequelize.DECIMAL (10, 2),
      },
      discounted_price: {
        type: Sequelize.DECIMAL (10, 2),
      },
      thumbnail: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      image_2: {
        type: Sequelize.STRING,
      },
      display: {
        type: Sequelize.DECIMAL (10, 2),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable ('product');
  },
};
