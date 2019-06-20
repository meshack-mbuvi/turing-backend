'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define (
    'Customer',
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      day_phone: DataTypes.STRING,
      eve_phone: DataTypes.STRING,
      mob_phone: DataTypes.STRING,
    },
    {tableName: 'customer'}
  );
  Customer.associate = function (models) {
    // associations can be defined here
  };
  return Customer;
};
