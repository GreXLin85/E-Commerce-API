const models = require("../models/index");
module.exports = {
  getAllUsers: async () => {
    let Users = await models.User.findAll({ include: { all: true, nested: true } });
    
    Users.forEach(user => {
      if (user.dataValues.type.id == 1) {
        delete user.dataValues.items;
      } else {
        delete user.dataValues.orders;
      }
    });
    console.log(Users);
    return Users;
  },
  getUser: async (id) => {
    let user = await models.User.findOne({ where: { id }, include: { all: true, nested: true } });
    if (user.dataValues.type.id == 1) {
      delete user.dataValues.items;
    } else {
      delete user.dataValues.orders;
    }
    return user;
  },
  getUserByUsername: async (username) => {
    let user = await models.User.findOne({ where: { username }, include: { all: true, nested: true } });
    if (user.dataValues.type.id == 1) {
      delete user.dataValues.items;
    } else {
      delete user.dataValues.orders;
    }
    return user;
  },
  createUser: async ({
    username,
    password,
    typeid = 1,
  }) => {
    // Check all parameters are present
    if (!username || !password || !(typeid == 1 || typeid == 2)) {
      throw new Error("Missing parameters");
    }
    // Check if user already exists
    let user = await models.User.findOne({ where: { username } });
    if (user) {
      throw new Error("User already exists");
    }
    // Create user and return
    return await models.User.create({
      username,
      password,
      typeid,
    });
  },
  updateUser: async (
    id,
    { username,
      password,
      typeid = 1 }
  ) => {
    // Check all parameters are present
    if (!username || !password || !(typeid == 1 || typeid == 2)) {
      throw new Error("Missing parameters");
    }
    // Check user exists
    let user = await models.User.findOne({ where: { id } });
    if (!user) {
      throw new Error("User does not exist");
    }
    // Update user and return
    return await models.User.update(
      {
        username,
        password,
        typeid,
      },
      {
        where: {
          id: id,
        },
      }
    );
  },
  deleteUser: async (id) => {
    // Check user exists
    let user = await models.User.findOne({ where: { id } });
    if (!user) {
      throw new Error("User does not exist");
    }
    // Delete user and return
    return await models.User.destroy({
      where: {
        id: id,
      },
    });
  },
};