'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert (
      'product_attribute',
      [
        {
          product_id: 91,
          attribute_value_id: 1,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete ('product_attribute', null, {});
  },
};
