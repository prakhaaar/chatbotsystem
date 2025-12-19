const { GoogleGenAI } = require("@google/genai");

// Initialize Gemini client
const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const askLLM = async (question) => {
  try {
    const response = await client.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
    You are a professional student-advisory assistant specializing in study-abroad guidance.
    Your responsibilities:
    - Answer ONLY study-abroad related questions (universities, countries, visas, exams, scholarships, costs, timelines).
    - If the question is NOT related to study abroad, politely respond that you can only help with study-abroad queries.
    - Provide accurate, practical, and concise guidance suitable for students.
    - Avoid assumptions, speculation, or fake facts.
    - If exact information is unknown, clearly say so instead of guessing.
    Response rules:
    - Use simple, clear language.
    - Prefer bullet points where helpful.
    - Keep the answer short and actionable (5–8 lines max).
    - Do NOT include emojis, markdown headers, or unnecessary explanations.
    Student question:
    ${question}
              `,
            },
          ],
        },
      ],
    });

    return response.text;
  } catch (error) {
    console.error("Chatbot Service Error:", error.message);

    // Fallback if model version fails
    if (error.message?.includes("404")) {
      console.log("Attempting fallback to gemini-2.0-flash...");

      const fallback = await client.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [
          {
            role: "user",
            parts: [{ text: question }],
          },
        ],
      });

      return fallback.text;
    }

    throw new Error("Failed to get a response from the AI service.");
  }
};

module.exports = { askLLM };
