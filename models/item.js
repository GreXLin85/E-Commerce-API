'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Item.belongsTo(models.User, {
        foreignKey: "sellerid",
        as: "seller"
      })
      Item.belongsTo(models.ItemCategory, {
        foreignKey: "categoryid",
        as: "category"
      })
      Item.hasMany(models.ItemOrder, {
        foreignKey: "itemid",
        as: "orders"
      })
    }
  };
  Item.init({
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sellerid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoryid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Item',
    paranoid: true,
  });
  return Item;
};