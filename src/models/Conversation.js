const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    query: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Query",
      required: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    response: {
      type: String,
      required: true,
      trim: true,
    },

    llmProvider: {
      type: String,
      enum: ["openai", "groq", "gemini", "other"],
      default: "openai",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conversation", conversationSchema);
