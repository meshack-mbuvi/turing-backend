'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define (
    'Category',
    {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      department_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      tableName: 'category',
    }
  );

  Category.associate = function (models) {
    Category.belongsTo (models.Department, {
      foreignKey: 'department_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    Category.belongsToMany (models.Product, {
      through: 'product_category',
      foreignKey: 'category_id',
    });
  };
  return Category;
};
