const {
    getAllUserTypes,
    getUserType,
    getUserTypeByName,
    createUserType,
    updateUserType,
    deleteUserType,
} = require("../services/usertype.service");

const ErrorService = require("../services/error.service");
const MessageService = require("../services/message.service");

module.exports.readAllUserTypes = async (req, res) => {
    try {
        const UserTypes = await getAllUserTypes();
        return MessageService(res,  UserTypes );
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};

module.exports.readUserType = async (req, res) => {
    try {
        const UserType = await getUserType(req.params.id);
        return MessageService(res,  UserType );
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};

module.exports.readUserTypeByName = async (req, res) => {
    try {
        const UserType = await getUserTypeByName(req.params.name);
        return MessageService(res,  UserType );
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};

module.exports.createUserType = async (req, res) => {
    try {
        let userTypeBody = {
            name: req.body.name,
            description: req.body.description,
        };

        const UserType = await createUserType(userTypeBody);
        return MessageService(res,  UserType );
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};

module.exports.updateUserType = async (req, res) => {
    try {
        let userTypeBody = {
            name: req.body.name,
            description: req.body.description,
        };
        await updateUserType(req.params.id, userTypeBody);
        let updatedUserType = await getUserType(req.params.id);
        return MessageService(res,  updatedUserType );
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};

module.exports.deleteUserType = async (req, res) => {
    try {
        let deletedUserType = await deleteUserType(req.params.id);

        if (deletedUserType == 1) {
            return MessageService(res,  "ok" );
        } else {
            return ErrorService(res, { message: deletedUserType });
        }
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};