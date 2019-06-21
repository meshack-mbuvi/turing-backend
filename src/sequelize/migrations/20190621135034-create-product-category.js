'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable ('product_category', {
      product_id: {
        type: Sequelize.INTEGER,
      },
      category_id: {
        type: Sequelize.INTEGER,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable ('product_category');
  },
};
