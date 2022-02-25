const express = require("express");
const router = express.Router();

const {
    readAllItems,
    readItem,
    readItemByName,
    createItem,
    updateItem,
    deleteItem,
} = require("../controllers/item.controller");

router.get("/", readAllItems);
router.get("/:id", readItem);
router.get("/name/:name", readItemByName);
router.post("/", createItem);
router.patch("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;