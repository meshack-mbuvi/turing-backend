'use strict';
module.exports = {
 up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('shipping', {
   shipping_id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
   },
   shipping_type: {
    type: Sequelize.STRING,
   },
   shipping_cost: {
    type: Sequelize.DECIMAL(10, 2),
   },
   shipping_region_id: {
    type: Sequelize.INTEGER,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    allowNull: false,
    references: {
     model: 'shipping_region',
     key: 'shipping_region_id',
    },
   },
  });
 },
 down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable('shipping');
 },
};
