const express = require("express");
const router = express.Router();

const {
    readAllItemOrders,
    readItemOrder,
    createItemOrder,
    updateItemOrder,
    deleteItemOrder,
} = require("../controllers/itemorder.controller");

router.get("/", readAllItemOrders);
router.get("/:id", readItemOrder);
router.post("/", createItemOrder);
router.patch("/:id", updateItemOrder);
router.delete("/:id", deleteItemOrder);

module.exports = router;