'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable ('review', {
      review_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      review: {
        type: Sequelize.STRING,
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'customer',
          key: 'customer_id',
        },
      },
      product_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
        references: {
          model: 'product',
          key: 'product_id',
        },
      },
      rating: {
        type: Sequelize.SMALLINT,
      },
      created_on: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable ('review');
  },
};
