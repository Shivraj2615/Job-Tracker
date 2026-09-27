const aiService = require("../services/aiService");

module.exports.analyzeJD = async (req, res) => {
  const { jobDescription } = req.body;

  if (!jobDescription || jobDescription.trim() === "") {
    return res.status(400).json({
      error: "Job description is required",
    });
  }

  try {
    const analysisResult =
      await aiService.analyzeJobDescription(jobDescription);

    return res.status(200).json({
      message: "JD analysis endpoint is working!",
      result: analysisResult,
    });
  } catch (error) {
    console.error("JD analysis error:", error);

    return res.status(500).json({
      error: "Something went wrong while analyzing the job description.",
    });
  }
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

  try {
    const matchResult = await aiService.matchResumeToJobDescription(
      resumeText,
      jobDescription,
    );

    return res.status(200).json({
      message: "Resume matching endpoint is working!",
      result: matchResult,
    });
  } catch (error) {
    console.error("Resume matching error:", error);

    return res.status(500).json({
      error: "AI service failed. Please try again later.",
    });
  }
};
