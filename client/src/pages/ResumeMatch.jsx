import { useState } from "react";
import { api, getAuthHeaders } from "../api/axios";
import "./AI.css";

const ResumeMatch = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [matchResult, setMatchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const matchResume = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) return;

    try {
      setLoading(true);

      const response = await api.post(
        "/ai/match-resume",
        { resumeText, jobDescription },
        { headers: getAuthHeaders() },
      );

      setMatchResult(response.data.result);
    } catch (error) {
      console.error("Resume matching error:", error);

      setError(
        error.response?.data?.error ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-match-page">
      <div className="resume-match-header">
        <div>
          <p className="eyebrow">SMARTTRACK AI</p>
          <h1>Resume Match</h1>
          <p>
            Compare your resume against a job description and understand how
            well your profile matches the role.
          </p>
        </div>
      </div>

      <div className="resume-match-card">
        <div className="card-header">
          <div>
            <h2>Match Your Resume</h2>
            <p>Paste your resume and the complete job description below.</p>
          </div>
        </div>

        <div className="input-group">
          <label>Resume</label>

          <textarea
            className="resume-input"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text here..."
          />

          <span>{resumeText.length} characters</span>
        </div>

        <div className="input-group">
          <label>Job Description</label>

          <textarea
            className="resume-input"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the complete job description here..."
          />

          <span>{jobDescription.length} characters</span>
        </div>

        <div className="match-footer">
          <button
            className="match-button"
            onClick={matchResume}
            disabled={loading || !resumeText.trim() || !jobDescription.trim()}
          >
            {loading ? "Matching..." : "Match Resume"}
          </button>
        </div>
      </div>

      {error && (
        <div className="ai-error-message" role="alert">
          {error}
        </div>
      )}

      {matchResult && (
        <div className="match-result-section">
          <div className="section-title">
            <p className="eyebrow">AI ANALYSIS</p>
            <h2>Resume Match Result</h2>
          </div>

          <div className="match-result-card">
            <div className="match-score">
              <span>{matchResult.matchScore}%</span>
              <p>Match Score</p>
            </div>

            <div className="match-explanation">
              <h3>Why this score?</h3>
              <p>{matchResult.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeMatch;
