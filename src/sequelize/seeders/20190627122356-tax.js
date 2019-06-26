"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "tax",
      [
        {
          tax_id: 1,
          tax_type: "Sales Tax at 8.5%",
          tax_percentage: 8.5
        },
        {
          tax_id: 2,
          tax_percentage: 0.0,
          tax_type: "No tax"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("tax", null, {});
  }
};
