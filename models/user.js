'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.ItemOrder, {
        foreignKey: "buyerid",
        as: "orders"
      })
      User.hasMany(models.Item, {
        foreignKey: "sellerid",
        as: "items"
      })
      User.belongsTo(models.UserType,{
        foreignKey: "typeid",
        as: "type"
      })
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    typeid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        user.password = bcrypt.hashSync(user.password, 10);
      }
    },
    paranoid: true,

  });
  return User;
};