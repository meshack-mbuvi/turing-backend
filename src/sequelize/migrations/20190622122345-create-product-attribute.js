'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable ('product_attribute', {
      product_id: {
        type: Sequelize.INTEGER,
      },
      attribute_value_id: {
        type: Sequelize.INTEGER,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable ('product_attribute');
  },
};
