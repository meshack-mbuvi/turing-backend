'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert (
      'attribute_value',
      [
        {
          attribute_id: 1,
          attribute_value_id: 1,
          value: 'S',
        },
        {
          attribute_id: 1,
          attribute_value_id: 2,
          value: 'M',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete ('attribute_value', null, {});
  },
};
