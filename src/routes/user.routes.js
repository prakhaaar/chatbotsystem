const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
} = require("../controllers/user.controller");

const { protect } = require("../../middlewares/auth.middleware");

const router = express.Router();

// this is public route
router.post("/", createUser);

// i have protected  these routes
router.get("/", protect, getAllUsers);
router.get("/:id", protect, getUserById);

module.exports = router;
