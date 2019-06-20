'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define (
    'Category',
    {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      department_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      tableName: 'category',
      timestamps: false,
    }
  );
  Category.associate = function (models) {
    // associations can be defined here
    Category.belongsTo (models.Department, {
      foreignKey: 'department_id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Category;
};
