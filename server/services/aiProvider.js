const Groq = require("groq-sdk");
const { GoogleGenAI } = require("@google/genai");

// GROQ
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateWithGroq = async (prompt) => {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0]?.message?.content;
};

// GEMINI
const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateWithGemini = async (prompt) => {
  const response = await gemini.models.generateContent({
    model: "gemini-3.8-flash",
    contents: prompt,
  });

  return response.text;
};

const generateWithFallback = async (prompt) => {
  try {
    return await generateWithGroq(prompt);
  } catch (groqError) {
    console.error("Groq failed:", groqError.message);
  }

  try {
    return await generateWithGemini(prompt);
  } catch (geminiError) {
    console.error("Gemini failed:", geminiError.message);
  }

  throw new Error("All AI providers are currently unavailable.");
};

module.exports = {
  generateWithGroq,
  generateWithGemini,
  generateWithFallback,
};
