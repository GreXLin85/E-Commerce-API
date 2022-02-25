const models = require("../models/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userService = require("./user.service");
module.exports = {
    loginService: async ({ username, password }) => {
        const user = await models.User.findOne({
            where: {
                username,
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Password is incorrect");
        }
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                typeid: user.typeid,
            },
            "123456789",
            {
                expiresIn: "24h",
            }
        );
        return {
            token: token,
            user: {
                id: user.id,
                username: user.username,
                typeid: user.typeid,
            },
        };
    },
    registerService: async ({ username, password, typeid }) => {
        // Create new user with user service
        const newUser = await userService.createUser({
            username, password, typeid
        });
        // Generate token for new user
        const token = jwt.sign(
            {
                id: newUser.id,
                username: newUser.username,
                typeid: newUser.typeid,
            },
            "123456789",
            {
                expiresIn: "24h",
            }
        );
        return {
            token: token,
            user: {
                id: newUser.id,
                username: newUser.username,
                typeid: newUser.typeid,
            },
        };
    },
};