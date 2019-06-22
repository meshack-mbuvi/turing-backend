'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert (
      'product',
      [
        {
          product_id: 91,
          name: 'A Partridge in a Pear Tree',
          description: 'The original of this beautiful stamp is by Jamie Wyeth and is in the National Gallery of Art. The next best is on our beautiful Christmas T-shirt!',
          price: '14.99',
          discounted_price: '0.00',
          thumbnail: 'a-partridge-in-a-pear-tree-thumbnail.gif',
          image: 'a-partridge-in-a-pear-tree.gif',
          image_2: 'a-partridge-in-a-pear-tree-2.gif',
          display: 0,
        },
        {
          product_id: 90,
          name: 'Adoration of the Kings',
          description: 'This design is from a miniature in the Evangelistary of Matilda in Nonantola Abbey, from the 12th century. As a Christmas T-shirt, it will cause you to be adored!',
          price: '17.50',
          discounted_price: '16.50',
          thumbnail: 'adoration-of-the-kings-thumbnail.gif',
          image: 'adoration-of-the-kings.gif',
          image_2: 'adoration-of-the-kings-2.gif',
          display: 2,
        },
        {
          product_id: 65,
          name: 'Afghan Flower',
          description: 'This beautiful image was issued to celebrate National Teachers Day. Perhaps you know a teacher who would love this T-shirt?',
          price: '18.50',
          discounted_price: '16.99',
          thumbnail: 'afghan-flower-thumbnail.gif',
          image: 'afghan-flower.gif',
          image_2: 'afghan-flower-2.gif',
          display: 2,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete ('product', null, {});
  },
};
