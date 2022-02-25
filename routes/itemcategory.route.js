const express = require("express");
const router = express.Router();

const {
    readAllItemCategories,
    readItemCategory,
    readItemCategoryByName,
    createItemCategory,
    updateItemCategory,
    deleteItemCategory,
} = require("../controllers/itemcategory.controller");

router.get("/", readAllItemCategories);
router.get("/:id", readItemCategory);
router.get("/name/:name", readItemCategoryByName);
router.post("/", createItemCategory);
router.patch("/:id", updateItemCategory);
router.delete("/:id", deleteItemCategory);

module.exports = router;