const Conversation = require("../models/Conversation");

/**
 * @desc    Get conversation history by user
 * @route   GET /api/conversations/user/:userId
 * @access  Public
 */
const getConversationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const conversations = await Conversation.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("query", "question");
      //Never trust client input. Ever.

    return res.status(200).json({
      success: true,
      count: conversations.length,
      data: conversations,
    });
  } catch (error) {
    console.error("Fetch user conversations error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch conversation history",
    });
  }
};

/**
 * @desc    Get recent conversations
 * @route   GET /api/conversations/recent
 * @access  Public (admin later)
 */
const getRecentConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("user", "name email");

    return res.status(200).json({
      success: true,
      count: conversations.length,
      data: conversations,
    });
  } catch (error) {
    console.error("Fetch recent conversations error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch recent conversations",
    });
  }
};

module.exports = {
  getConversationsByUser,
  getRecentConversations,
};
