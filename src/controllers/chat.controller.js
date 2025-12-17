const Query = require("../models/Query");

/**
 * @desc    Create a query
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

    const query = await Query.create({
      user: userId,
      question,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Query received",
      data: {
        queryId: query._id,
        status: query.status,
      },
    });
  } catch (error) {
    console.error("Create chat error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createChat,
};
