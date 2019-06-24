'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable ('orders', {
      order_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      total_amount: Sequelize.DECIMAL (10, 2),
      created_on: Sequelize.DATE,
      shipped_on: Sequelize.DATE,
      status: Sequelize.INTEGER,
      comments: Sequelize.STRING,
      customer_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
        references: {
          model: 'product',
          key: 'product_id',
        },
      },
      auth_code: Sequelize.STRING,
      reference: Sequelize.STRING,
      shipping_id: Sequelize.INTEGER,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable ('orders');
  },
};
