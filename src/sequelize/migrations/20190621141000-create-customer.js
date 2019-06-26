'use strict';
module.exports = {
 up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('customer', {
   customer_id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
   },
   name: {
    type: Sequelize.STRING,
    allowNull: false,
   },
   email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
   },
   password: {
    type: Sequelize.STRING,
    allowNull: false,
   },
   day_phone: {
    type: Sequelize.STRING,
   },
   eve_phone: {
    type: Sequelize.STRING,
   },
   mob_phone: {
    type: Sequelize.STRING,
   },
   stripe_customer_id: {
    type: Sequelize.STRING,
   },
   credit_card: {
    type: Sequelize.STRING,
   },
   address_1: {
    type: Sequelize.STRING,
   },
   address_2: {
    type: Sequelize.STRING,
   },
   city: {
    type: Sequelize.STRING,
   },
   region: {
    type: Sequelize.STRING,
   },
   country: {
    type: Sequelize.STRING,
   },
   postal_code: {
    type: Sequelize.STRING,
   },
   shipping_region_id: {
    type: Sequelize.INTEGER,
   },
  });
 },
 down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable('customer');
 },
};
