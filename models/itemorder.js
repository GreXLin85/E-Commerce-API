'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ItemOrder.belongsTo(models.Item, {
        foreignKey: "itemid",
        as: "item"
      })
      ItemOrder.belongsTo(models.User, {
        foreignKey: "buyerid",
        as: "buyer"
      })
    }
  };
  ItemOrder.init({
    itemid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    buyerid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isDelivered: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'ItemOrder',
    paranoid: true,
  });
  return ItemOrder;
};