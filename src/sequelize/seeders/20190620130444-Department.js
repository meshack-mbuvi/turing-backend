'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert (
      'department',
      [
        {
          department_id: 1,
          name: 'Regional',
          description: 'Proud of your country? Wear a T-shirt with a national symbol stamp!',
        },
        {
          department_id: 2,
          name: 'Nature',
          description: 'Find beautiful T-shirts with animals and flowers in our Nature department!',
        },
        {
          department_id: 3,
          name: 'Seasonal',
          description: 'Each time of the year has a special flavor. Our seasonal T-shirts express traditional symbols using unique postal stamp pictures.',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete ('Department', null, {});
  },
};
