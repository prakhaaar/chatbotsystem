const express = require("express");
const { createUser } = require("../controllers/user.controller");

const router = express.Router();

// POST /api/users
router.post("/", createUser);

module.exports = router;
