const models = require("../models/index");

module.exports = {
    getAllItems: async () => {
        return await models.Item.findAll({ include: { all: true, nested: true } });
    },
    getItem: async (id) => {
        console.log(id);
        return await models.Item.findOne({ where: { id: id }, include: { all: true, nested: true } });
    },
    getItemByName: async (name) => {
        return await models.Item.findOne({ where: { name }, include: { all: true, nested: true }  });
    },
    createItem: async ({ name, price, quantity, sellerid, categoryid, image_url }) => {
        // Check all parameters are present
        if (!name || !price || !quantity || !sellerid || !categoryid || !image_url) {
            throw new Error("Missing parameters");
        }
        // Check item exists
        const item = await models.Item.findOne({ where: { name } });
        if (item) {
            throw new Error("Item already exist");
        }
        // Check sellerid exists
        let seller = await models.User.findOne({ where: { id: sellerid } });
        if (!seller) {
            throw new Error("Seller does not exist");
        }
        if (seller.typeid != 1) {
            throw new Error("Seller does not exist");
        }
        // Check categoryid exists
        let category = await models.ItemCategory.findOne({ where: { id: categoryid } });
        if (!category) {
            throw new Error("Category does not exist");
        }
        // Create item and return
        return await models.Item.create({
            name, price, quantity, sellerid, categoryid, image_url
        });
    },
    updateItem: async (id, { name, price, quantity, sellerid, categoryid, image_url }) => {
        // Check all parameters are present
        if (!name || !price || !quantity || !sellerid || !categoryid || !image_url) {
            throw new Error("Missing parameters");
        }
        // Check item exists
        let item = await models.Item.findOne({ where: { id } });
        if (!item) {
            throw new Error("Item does not exist");
        }
        // Check sellerid exists
        let seller = await models.User.findOne({ where: { id: sellerid } });
        if (!seller) {
            throw new Error("Seller does not exist");
        }
        // Check categoryid exists
        let category = await models.ItemCategory.findOne({ where: { id: categoryid } });
        if (!category) {
            throw new Error("Category does not exist");
        }

        // Update item and return
        return await models.Item.update(
            {
                name, price, quantity, sellerid, categoryid, image_url
            },
            { where: { id } }
        );
    },
    deleteItem: async (id) => {
        // Check item exists
        let item = await models.Item.findOne({ where: { id } });
        if (!item) {
            throw new Error("Item does not exist");
        }
        // Delete item and return
        return await models.Item.destroy({ where: { id } });
    },
};