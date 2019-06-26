'use strict';
module.exports = {
 up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('tax', {
   tax_id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
   },
   tax_type: {
    type: Sequelize.STRING,
   },
   tax_percentage: {
    type: Sequelize.INTEGER,
   },
  });
 },
 down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable('tax');
 },
};
