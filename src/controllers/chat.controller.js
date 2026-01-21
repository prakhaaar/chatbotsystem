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
    const { question } = req.body;
    const userId = req.user.id;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const query = await Query.create({
      user: userId,
      question,
      status: "pending",
    });

    const aiResponse = await askLLM(question);

    const conversation = await Conversation.create({
      user: userId,
      query: query._id,
      question,
      response: aiResponse,
    });

    query.status = "answered";
    await query.save();

    return res.status(201).json({
      success: true,
      message: "Response generated",
      data: {
        conversationId: conversation._id,
        response: aiResponse,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to generate response",
    });
  }
};

module.exports = {
  createChat,
};
