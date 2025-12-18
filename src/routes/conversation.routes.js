const express = require("express");
const {
  getConversationsByUser,
  getRecentConversations,
} = require("../controllers/conversation.controller");

const router = express.Router();

router.get("/user/:userId", getConversationsByUser);
router.get("/recent", getRecentConversations);

module.exports = router;
