'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define (
    'Department',
    {
      name: DataTypes.STRING,
    },
    {
      tableName: 'department',
    }
  );
  Department.associate = function (models) {
    // associations can be defined here
  };
  return Department;
};
