'use strict';

module.exports = {
 up: (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert(
   'shipping_region',
   [
    {
     shipping_region_id: 1,
     shipping_region: 'Please select',
    },
    {
     shipping_region_id: 2,
     shipping_region: 'US/Canada',
    },
    {
     shipping_region_id: 3,
     shipping_region: 'Europe',
    },
    {
     shipping_region_id: 4,
     shipping_region: 'Rest of the World',
    },
   ],
   {}
  );
 },

 down: (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('shipping_region', null, {});
 },
};
