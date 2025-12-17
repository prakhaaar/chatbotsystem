const mongoose = require("mongoose");

const querySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      default: "study-abroad",
    },

    llmProvider: {
      type: String,
      enum: ["openai", "groq", "gemini", "other"],
      default: "openai",
    },

    status: {
      type: String,
      enum: ["pending", "answered", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Query", querySchema);
