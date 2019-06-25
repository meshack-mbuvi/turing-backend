'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('order_detail', {
      item_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      order_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
        references: {
          model: 'orders',
          key: 'order_id'
        }
      },
      product_id: Sequelize.INTEGER,
      attributes: Sequelize.STRING,
      product_name: Sequelize.STRING,
      quantity: Sequelize.INTEGER,
      unit_cost: Sequelize.DECIMAL(10, 2)
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('order_detail');
  }
};
