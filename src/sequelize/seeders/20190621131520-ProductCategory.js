'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert (
      'product_category',
      [
        {
          product_id: 91,
          category_id: 1,
        },
        {
          product_id: 90,
          category_id: 1,
        },
        {
          product_id: 65,
          category_id: 1,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete ('product_category', null, {});
  },
};
