const aiService = require("../services/aiService");

module.exports.analyzeJD = async (req, res) => {
  const { jobDescription } = req.body;

  if (!jobDescription || jobDescription.trim() === "") {
    return res.status(400).json({ error: "Job description is required" });
  }

  const analysisResult = await aiService.analyzeJobDescription(jobDescription);

  return res.status(200).json({
    message: "JD analysis endpoint is working!",
    result: analysisResult,
  });
};

module.exports.matchResume = async (req, res) => {
  const { resumeText, jobDescription } = req.body;

  if (
    !resumeText ||
    resumeText.trim() === "" ||
    !jobDescription ||
    jobDescription.trim() === ""
  ) {
    return res
      .status(400)
      .json({ error: "Both resume text and job description are required" });
  }

  const matchResult = await aiService.matchResumeToJobDescription(
    resumeText,
    jobDescription,
  );

  return res.status(200).json({
    message: "Resume matching endpoint is working!",
    result: matchResult,
  });
};
