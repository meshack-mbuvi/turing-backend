'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attribute = sequelize.define (
    'Attribute',
    {
      attribute_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      tableName: 'attribute',
    }
  );
  Attribute.associate = function (models) {
    Attribute.hasMany (models.AttributeValue, {
      foreignKey: 'attribute_value_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      as: 'values',
    });
  };
  return Attribute;
};
