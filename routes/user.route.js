const express = require("express");
const router = express.Router();

const {
    readAllUsers,
    readUser,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/user.controller");

router.get("/", readAllUsers);
router.get("/:id", readUser);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;