const models = require("../models/index");

module.exports = {
    getAllItemOrders: async () => {
        return await models.ItemOrder.findAll({});
    },
    getItemOrder: async (id) => {
        return await models.ItemOrder.findOne({ where: { id } });
    },
    createItemOrder: async ({ itemid, buyerid, isDelivered, quantity }) => {
        // Check all parameters are present
        if (!itemid || !buyerid || !isDelivered || !quantity) {
            throw new Error("Missing parameters");
        }
        // Check quantity is positive
        if (quantity < 0) {
            throw new Error("Quantity must be positive");
        }
        // Check if itemid exists
        let item = await models.Item.findOne({ where: { id: itemid } });
        if (!item) {
            throw new Error("Item does not exist");
        }
        // Check if buyerid exists
        let buyer = await models.User.findOne({ where: { id: buyerid } });
        if (!buyer) {
            throw new Error("Buyer does not exist");
        }
        if (buyer.typeid === 2) {
            throw new Error("User is not a buyer");
        }

        // Create itemOrder and return
        return await models.ItemOrder.create({
            itemid, buyerid, isDelivered, quantity
        });
    },
    updateItemOrder: async (id, { itemid, buyerid, isDelivered, quantity }) => {
        // Check all parameters are present
        if (!itemid || !buyerid || !isDelivered || !quantity) {
            throw new Error("Missing parameters");
        }
        // Check quantity is positive
        if (quantity < 0) {
            throw new Error("Quantity must be positive");
        }
        // Check itemOrder exists
        let itemOrder = await models.Item.findOne({ where: { id } });
        if (itemOrder) {
            throw new Error("ItemOrder already exist");
        }

        if (itemOrder.isDelivered) {
            if (itemOrder.quantity !== quantity) {
                throw new Error("Cannot change quantity of delivered item");
            }
        } else {
            if (isDelivered) {
                if (itemOrder.quantity !== quantity) {
                    throw new Error("Cannot change quantity of delivered item");
                }
            }
        }

        // Check if itemid exists
        let item = await models.Item.findOne({ where: { id: itemid } });
        if (!item) {
            throw new Error("Item does not exist");
        }
        // Check if buyerid exists
        let buyer = await models.User.findOne({ where: { id: buyerid } });
        if (!buyer) {
            throw new Error("Buyer does not exist");
        }
        if (buyer.typeid === 2) {
            throw new Error("User is not a buyer");
        }

        // Update itemOrder and return
        return await models.ItemOrder.update(
            {
                itemid, buyerid, isDelivered, quantity
            },
            { where: { id } }
        );
    },
    deleteItemOrder: async (id) => {
        // Check itemOrder exists
        let itemOrder = await models.Item.findOne({ where: { id } });
        if (!itemOrder) {
            throw new Error("ItemOrder does not exist");
        }
        // Delete itemOrder and return
        return await models.ItemOrder.destroy({ where: { id } });
    },
};