const express = require("express");

const app = express();

// Middleware
app.use(express.json());
// Routes
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/chat", require("./routes/chat.routes"));


// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is healthy",
  });
});

module.exports = app;
