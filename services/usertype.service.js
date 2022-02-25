const models = require("../models/index");

module.exports = {
    getAllUserTypes: async () => {
        return await models.UserType.findAll({});
    },
    getUserType: async (id) => {
        return await models.UserType.findOne({ where: { id } });
    },
    getUserTypeByName: async (name) => {
        return await models.UserType.findOne({ where: { name } });
    },
    createUserType: async ({ name, description }) => {
        // Check all parameters are present
        if (!name || !description) {
            throw new Error("Missing parameters");
        }
        // Check if userType already exists
        let userType = await models.UserType.findOne({ where: { name } });
        if (userType) {
            throw new Error("UserType already exists");
        }
        // Create userType and return
        return await models.UserType.create({
            name,
            description,
        });
    },
    updateUserType: async (id, { name, description }) => {
        // Check all parameters are present
        if (!name || !description) {
            throw new Error("Missing parameters");
        }
        // Check userType exists
        let userType = await models.UserType.findOne({ where: { id } });
        if (!userType) {
            throw new Error("UserType does not exist");
        }
        // Update userType and return
        return await models.UserType.update(
            {
                name,
                description,
            },
            { where: { id } }
        );
    },
    deleteUserType: async (id) => {
        // Check userType exists
        let userType = await models.UserType.findOne({ where: { id } });
        if (!userType) {
            throw new Error("UserType does not exist");
        }
        // Delete userType and return
        return await models.UserType.destroy({ where: { id } });
    },
};