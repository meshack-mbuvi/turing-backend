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
        {
          attribute_id: 1,
          attribute_value_id: 3,
          value: 'L',
        },
        {
          attribute_id: 1,
          attribute_value_id: 4,
          value: 'XL',
        },
        {
          attribute_id: 1,
          attribute_value_id: 5,
          value: 'XXL',
        },
        {
          attribute_id: 2,
          attribute_value_id: 6,
          value: 'White',
        },
        {
          attribute_id: 2,
          attribute_value_id: 7,
          value: 'Black',
        },
        {
          attribute_id: 2,
          attribute_value_id: 8,
          value: 'Red',
        },
        {
          attribute_id: 2,
          attribute_value_id: 9,
          value: 'Orange',
        },
        {
          attribute_id: 2,
          attribute_value_id: 10,
          value: 'Yellow',
        },
        {
          attribute_id: 2,
          attribute_value_id: 11,
          value: 'Green',
        },
        {
          attribute_id: 2,
          attribute_value_id: 12,
          value: 'Blue',
        },
        {
          attribute_id: 2,
          attribute_value_id: 13,
          value: 'Indigo',
        },
        {
          attribute_id: 2,
          attribute_value_id: 14,
          value: 'Purple',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete ('attribute_value', null, {});
  },
};
