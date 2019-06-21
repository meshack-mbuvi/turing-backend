'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define (
    'Customer',
    {
      customer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.TEXT,
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
