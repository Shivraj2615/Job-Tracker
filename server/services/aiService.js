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

module.exports.matchResumeToJobDescription = async (
  resumeText,
  jobDescription,
) => {
  const prompt = `
You are a resume matching assistant.

Analyze the candidate's resume against the provided job description and determine how well the resume matches the job requirements.

Evaluate the match based on:
- Required skills and technologies
- Preferred skills and technologies
- Relevant experience
- Responsibilities and role alignment
- Relevant projects or practical experience mentioned in the resume
- Overall relevance of the candidate's background to the job description

Do not rely only on exact keyword matching. Consider the meaning and context of the resume and job description.

Important rules:
- Do not invent or assume skills, experience, qualifications, projects, or technologies that are not explicitly supported by the resume.
- Only consider information that is present in the resume.
- A skill should not be considered a match simply because it is similar in name unless the context supports the match.
- The match score must be a number between 0 and 100.
- Provide a brief explanation of why the resume received the given score.
- Return ONLY valid JSON.
- Do not include Markdown, code fences, or any text outside the JSON object.

Return the result using exactly this structure:

{
  "matchScore": 0,
  "explanation": ""
}

Resume:
${resumeText}

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
