const User = require("../models/User");
const Conversation = require("../models/Conversation");
const Query = require("../models/Query");

const getAllUsersAdmin = async (req, res) => {
  const users = await User.find().select("-password");
  res.json({ success: true, count: users.length, data: users });
};

const getAllConversationsAdmin = async (req, res) => {
  const conversations = await Conversation.find()
    .populate("user", "name email")
    .populate("query", "question")
    .sort({ createdAt: -1 });

  res.json({ success: true, count: conversations.length, data: conversations });
};

const getAllQueriesAdmin = async (req, res) => {
  const queries = await Query.find().sort({ createdAt: -1 });
  res.json({ success: true, count: queries.length, data: queries });
};

module.exports = {
  getAllUsersAdmin,
  getAllConversationsAdmin,
  getAllQueriesAdmin,
};
