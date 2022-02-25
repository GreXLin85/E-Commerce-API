const {
    getAllUsers,
    getUser,
    getUserByUsername,
    createUser,
    updateUser,
    deleteUser,
} = require("../services/user.service");

const ErrorService = require("../services/error.service");
const MessageService = require("../services/message.service");

module.exports.readAllUsers = async (req, res) => {
    try {
        const Users = await getAllUsers();
        return MessageService(res,  Users);
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};

module.exports.readUser = async (req, res) => {
    try {
        const User = await getUser(req.params.id);
        return MessageService(res,  User );
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};

module.exports.readUserByUsername = async (req, res) => {
    try {
        const User = await getUserByUsername(req.params.username);
        return MessageService(res,  User );
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};

module.exports.createUser = async (req, res) => {
    try {
        let userBody = {
            username: req.body.username,
            password: req.body.password,
            typeid: req.body.typeid,
        };

        const User = await createUser(userBody);
        return MessageService(res,  User );
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};

module.exports.updateUser = async (req, res) => {
    try {
        let userBody = {
            username: req.body.username,
            password: req.body.password,
            typeid: req.body.typeid,
        };
        await updateUser(req.params.id, userBody);
        let updatedUser = await getUser(req.params.id);
        return MessageService(res,  updatedUser );
    } catch (error) {
        console.log(error);
        return ErrorService(res, { message: error.message });
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        let deletedUser = await deleteUser(req.params.id);

        if (deletedUser == 1) {
            return MessageService(res,  "ok" );
        } else {
            return ErrorService(res, { message: deletedUser });
        }
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};