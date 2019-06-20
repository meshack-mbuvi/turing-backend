'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable ('category', {
      category_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      department_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
        references: {
          model: 'department',
          key: 'department_id',
        },
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
      },
      description: {
        type: Sequelize.STRING,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable ('category');
  },
};
