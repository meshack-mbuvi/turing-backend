'use strict';

module.exports = {
 up: (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert(
   'shipping',
   [
    {
     shipping_id: 1,
     shipping_type: 'Next day Deliver',
     shipping_cost: '20.00',
     shipping_region_id: 1,
    },
   ],
   {}
  );
 },

 down: (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('shipping', null, {});
 },
};
