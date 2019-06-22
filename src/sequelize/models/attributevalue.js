'use strict';
module.exports = (sequelize, DataTypes) => {
  const AttributeValue = sequelize.define (
    'AttributeValue',
    {
      attribute_value_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      attribute_id: {
        type: DataTypes.INTEGER,
      },
      value: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      tableName: 'attribute_value',
    }
  );
  AttributeValue.associate = function (models) {
    AttributeValue.belongsTo (models.Attribute, {
      foreignKey: 'attribute_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    AttributeValue.belongsToMany (models.Product, {
      through: 'product_attribute',
      foreignKey: 'attribute_value_id',
    });
  };
  return AttributeValue;
};
