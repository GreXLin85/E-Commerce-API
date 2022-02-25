const {
    getAllItemCategoryies,
    getItemCategory,
    getItemCategoryByName,
    createItemCategory,
    updateItemCategory,
    deleteItemCategory,
} = require("../services/itemcategory.service");

const ErrorService = require("../services/error.service");
const MessageService = require("../services/message.service");

module.exports.readAllItemCategories = async (req, res) => {
    try {
        const ItemCategoryies = await getAllItemCategoryies();
        return MessageService(res, ItemCategoryies);
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};

module.exports.readItemCategory = async (req, res) => {
    try {
        const ItemCategory = await getItemCategory(req.params.id);
        return MessageService(res, ItemCategory);
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};

module.exports.readItemCategoryByName = async (req, res) => {
    try {
        const ItemCategory = await  getItemCategoryByName(req.params.name);
        return MessageService(res, ItemCategory);
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};

module.exports.createItemCategory = async (req, res) => {
    try {
        let itemCategoryBody = {
            name: req.body.name,
            description: req.body.description,
        };

        const ItemCategory = await createItemCategory(itemCategoryBody);
        return MessageService(res, ItemCategory);
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};

module.exports.updateItemCategory = async (req, res) => {
    try {
        let itemCategoryBody = {
            name: req.body.name,
            description: req.body.description,
        };
        await updateItemCategory(req.params.id, itemCategoryBody);
        let updatedItemCategory = await getItemCategory(req.params.id);
        return MessageService(res, updatedItemCategory);
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};

module.exports.deleteItemCategory = async (req, res) => {
    try {
        let deletedItemCategory = await deleteItemCategory(req.params.id);

        if (deletedItemCategory == 1) {
            return MessageService(res, "ok");
        } else {
            return ErrorService(res, { message: deletedItemCategory });
        }
    } catch (error) {
        return ErrorService(res, { message: error.message });
    }
};