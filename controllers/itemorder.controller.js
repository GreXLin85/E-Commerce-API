const {
    getAllItemOrders,
    getItemOrder,
    createItemOrder,
    updateItemOrder,
    deleteItemOrder,
} = require("../services/itemorder.service");

const ErrorService = require("../services/error.service");
const MessageService = require("../services/message.service");

module.exports.readAllItemOrders = async (req, res) => {
    try {
        const ItemOrders = await getAllItemOrders();
        return MessageService(res, ItemOrders);
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};

module.exports.readItemOrder = async (req, res) => {
    try {
        const ItemOrder = await getItemOrder(req.params.id);
        return MessageService(res, ItemOrder);
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};

module.exports.createItemOrder = async (req, res) => {
    try {
        let itemOrderBody = {
            itemid: req.body.itemid,
            buyerid: req.body.buyerid,
            isDelivered: req.body.isDelivered,
            quantity: req.body.quantity,
        };

        const ItemOrder = await createItemOrder(itemOrderBody);
        return MessageService(res, ItemOrder);
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};

module.exports.updateItemOrder = async (req, res) => {
    try {
        let itemOrderBody = {
            itemid: req.body.itemid,
            buyerid: req.body.buyerid,
            isDelivered: req.body.isDelivered,
            quantity: req.body.quantity,
        };
        await updateItemOrder(req.params.id, itemOrderBody);
        let updatedItemOrder = await getItemOrder(req.params.id);
        return MessageService(res, updatedItemOrder);
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};

module.exports.deleteItemOrder = async (req, res) => {
    try {
        let deletedItemOrder = await deleteItemOrder(req.params.id);

        if (deletedItemOrder == 1) {
            return MessageService(res, "ok");
        } else {
            return ErrorService(res, { message: deletedItemOrder });
        }
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};