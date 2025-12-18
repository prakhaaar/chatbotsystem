const { GoogleGenAI } = require("@google/genai");

// Initialize the new client
const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const askLLM = async (question) => {
  try {

    const response = await client.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          role: "user",
          parts: [{
            text: `You are a helpful student-advisory assistant.
Answer only study abroad related questions clearly and concisely.

Question: ${question}`
          }]
        }
      ]
    });

    return response.text;
  } catch (error) {
    console.error("Chatbot Service Error:", error.message);
    
    // Fallback logic: if 1.5-flash fails;
    if (error.message.includes("404")) {
        console.log("Attempting fallback to gemini-2.0-flash...");
        const fallback = await client.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [{ role: "user", parts: [{ text: question }] }]
        });
        return fallback.text;
    }

    throw new Error("Failed to get a response from the AI service.");
  }
};



module.exports = { askLLM };



