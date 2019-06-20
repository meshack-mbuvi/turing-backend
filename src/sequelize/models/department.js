'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define (
    'Department',
    {
      department_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      description: DataTypes.STRING,
    },
    {
      tableName: 'department',
      timestamps: false,
    }
  );
  Department.associate = function (models) {
    // associations can be defined here
  };
  return Department;
};
