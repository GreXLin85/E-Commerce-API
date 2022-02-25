const {
    getAllItems,
    getItem,
    getItemByName,
    createItem,
    updateItem,
    deleteItem,
} = require("../services/item.service");

const ErrorService = require("../services/error.service");
const MessageService = require("../services/message.service");

module.exports.readAllItems = async (req, res) => {
    try {
        const Items = await getAllItems();
        return MessageService(res, Items);
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};

module.exports.readItem = async (req, res) => {
    try {
        const Item = await getItem(req.params.id);
        return MessageService(res, Item);
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};

module.exports.readItemByName = async (req, res) => {
    try {
        const Item = await getItemByName(req.params.name);
        return MessageService(res, Item);
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};

module.exports.createItem = async (req, res) => {
    try {
        let itemBody = {
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            sellerid: req.body.sellerid,
            categoryid: req.body.categoryid,
            image_url: req.body.image_url,
        };

        const Item = await createItem(itemBody);
        return MessageService(res, Item);
    } catch (error) {
        console.log(error);
        return ErrorService(res, { message: error.message });
    }
};

module.exports.updateItem = async (req, res) => {
    try {
        let itemBody = {
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            sellerid: req.body.sellerid,
            categoryid: req.body.categoryid,
            image_url: req.body.image_url,
        };
        await updateItem(req.params.id, itemBody);
        let updatedItem = await getItem(req.params.id);
        return MessageService(res, updatedItem);
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};

module.exports.deleteItem = async (req, res) => {
    try {
        let deletedItem = await deleteItem(req.params.id);

        if (deletedItem == 1) {
            return MessageService(res, "ok");
        } else {
            return ErrorService(res, { message: deletedItem });
        }
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};