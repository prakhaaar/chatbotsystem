const Query = require("../models/Query");
const Conversation = require("../models/Conversation");
const { askLLM } = require("../services/llm.service");

/**
 * @desc    Ask chatbot (LLM)
 * @route   POST /api/chat
 * @access  Public
 */
const createChat = async (req, res) => {
  try {
    const { userId, question } = req.body;

    if (!userId || !question) {
      return res.status(400).json({
        success: false,
        message: "userId and question are required",
      });
    }

    // 1️⃣ Create Query
    const query = await Query.create({
      user: userId,
      question,
      status: "pending",
    });

    // 2️⃣ Ask LLM
    const aiResponse = await askLLM(question);

    // 3️⃣ Save Conversation
    const conversation = await Conversation.create({
      user: userId,
      query: query._id,
      question,
      response: aiResponse,
    });

    // 4️⃣ Update Query status
    query.status = "answered";
    await query.save();

    return res.status(201).json({
      success: true,
      message: "Response generated",
      data: {
        queryId: query._id,
        conversationId: conversation._id,
        response: aiResponse,
      },
    });
  } catch (error) {
    console.error("Chatbot error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate response",
    });
  }
};

module.exports = {
  createChat,
};
