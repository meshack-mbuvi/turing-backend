'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert (
      'attribute',
      [
        {
          attribute_id: 1,
          name: 'Size',
        },
        {
          attribute_id: 2,
          name: 'Color',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete ('attribute', null, {});
  },
};
