const express = require("express");
const router = express.Router();

const {
    readAllUserTypes,
    readUserType,
    createUserType,
    updateUserType,
    deleteUserType,
} = require("../controllers/usertype.controller");

router.get("/", readAllUserTypes);
router.get("/:id", readUserType);
router.post("/", createUserType);
router.patch("/:id", updateUserType);
router.delete("/:id", deleteUserType);

module.exports = router;