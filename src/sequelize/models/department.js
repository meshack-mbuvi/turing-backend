'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define (
    'Department',
    {
      department_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      description: DataTypes.STRING,
    },
    {
      tableName: 'department',
    }
  );

  Department.associate = function (models) {
    Department.hasMany (models.Category, {
      foreignKey: 'category_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: 'categories',
    });
  };

  return Department;
};
