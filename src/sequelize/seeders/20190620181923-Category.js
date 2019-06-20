'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert (
      'category',
      [
        {
          category_id: 1,
          department_id: 1,
          name: 'French',
          description: "The French have always had an eye for beauty. One look at the T-shirts below and you'll see that same appreciation has been applied abundantly to their postage stamps.",
        },
        {
          category_id: 2,
          department_id: 1,
          name: 'Italian',
          description: "The full and resplendent treasure chest of art, literature, music, and science that Italy has given the world is reflected splendidly in its postal stamps. ",
        },
        {
          category_id: 3,
          department_id: 2,
          name: 'Irish',
          description: "It was Churchill who remarked that he thought the Irish most curious because they didn't want to be English. How right he was! But then, he was half-American, wasn't he?",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete ('category', null, {});
  },
};
