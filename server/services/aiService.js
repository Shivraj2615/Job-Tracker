const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

module.exports.analyzeJobDescription = async (jobDescription) => {
  const prompt = `
Analyze the following job description.

Extract:
- job role
- required skills
- preferred skills
- experience requirements
- responsibilities
- important keywords

Return the result as JSON with exactly this structure:

{
  "role": "",
  "requiredSkills": [],
  "preferredSkills": [],
  "experience": "",
  "responsibilities": [],
  "keywords": []
}

Job Description:
${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  const text = response.text;

  const cleanedText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanedText);
};
