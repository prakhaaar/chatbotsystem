const express = require("express");
const { createChat } = require("../controllers/chat.controller");
const router = express.Router();
const { chatRateLimiter } = require("../middlewares/rateLimit.middleware");
const { protect } = require("../middlewares/auth.middleware");

router.post("/", protect, chatRateLimiter, createChat);

module.exports = router;
