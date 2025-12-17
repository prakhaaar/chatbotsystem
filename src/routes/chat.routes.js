const express=require("express");
const {createChat}=require("../controllers/chat.controller");
const router=express.Router();  

router.post("/", createChat);

module.exports = router;