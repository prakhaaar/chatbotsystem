const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/admin.middleware");
const {
  getAllUsersAdmin,
  getAllConversationsAdmin,
  getAllQueriesAdmin,
} = require("../controllers/admin.controller");

const router = express.Router();

router.get("/users", protect, isAdmin, getAllUsersAdmin);
router.get("/conversations", protect, isAdmin, getAllConversationsAdmin);
router.get("/queries", protect, isAdmin, getAllQueriesAdmin);

module.exports = router;
