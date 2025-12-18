const rateLimit = require("express-rate-limit");

const chatRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many chat requests. Please try again later.",
  },
});

module.exports = { chatRateLimiter };

/** 
 * “I rate-limited the chatbot endpoint to prevent API abuse and control LLM costs, 
 * while leaving other endpoints unaffected.”
*/