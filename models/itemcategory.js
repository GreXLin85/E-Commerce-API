'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ItemCategory.hasMany(models.Item, {
        foreignKey: 'categoryid',
        as: 'items'
      })
    }
  };
  ItemCategory.init({
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'ItemCategory',
    paranoid: true,
  });
  return ItemCategory;
};