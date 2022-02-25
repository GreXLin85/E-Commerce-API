const models = require("../models/index");

module.exports = {
    getAllItemCategoryies: async () => {
        return await models.ItemCategory.findAll({});
    },
    getItemCategory: async (id) => {
        return await models.ItemCategory.findOne({ where: { id } });
    },
    getItemCategoryByName: async (name) => {
        return await models.ItemCategory.findOne({ where: { name } });
    },
    createItemCategory: async ({ name, description }) => {
        // Check all parameters are present
        if (!name || !description) {
            throw new Error("Missing parameters");
        }
        // Check if itemCategory already exists
        let itemCategory = await models.ItemCategory.findOne({ where: { name } });
        if (itemCategory) {
            throw new Error("Item Category already exists");
        }
        // Create itemCategory and return
        return await models.ItemCategory.create({
            name,
            description,
        });
    },
    updateItemCategory: async (id, { name, description }) => {
        // Check all parameters are present
        if (!name || !description) {
            throw new Error("Missing parameters");
        }
        // Check itemCategory exists
        let itemCategory = await models.ItemCategory.findOne({ where: { id } });
        if (!itemCategory) {
            throw new Error("ItemCategory does not exist");
        }
        // Update itemCategory and return
        return await models.ItemCategory.update(
            {
                name,
                description,
            },
            { where: { id } }
        );
    },
    deleteItemCategory: async (id) => {
        // Check itemCategory exists
        let itemCategory = await models.ItemCategory.findOne({ where: { id } });
        if (!itemCategory) {
            throw new Error("ItemCategory does not exist");
        }
        // Delete itemCategory and return
        return await models.ItemCategory.destroy({ where: { id } });
    },
};