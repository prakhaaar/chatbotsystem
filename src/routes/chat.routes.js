const express=require("express");
const {createChat}=require("../controllers/chat.controller");
const router=express.Router();  
const { chatRateLimiter } = require("../middlewares/rateLimit.middleware");

router.post("/", chatRateLimiter, createChat);

module.exports = router