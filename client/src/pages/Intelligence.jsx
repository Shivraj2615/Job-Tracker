import { useState } from "react";
import { api, getAuthHeaders } from "../api/axios";
import "./AI.css";

const Intelligence = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeJD = async () => {
    if (!jobDescription.trim()) return;

    try {
      setLoading(true);

      const response = await api.post(
        "/ai/analyze-jd",
        { jobDescription },
        { headers: getAuthHeaders() },
      );

      setAnalysis(response.data.result);
    } catch (error) {
      console.error("JD analysis error:", error);

      setError(
        error.response?.data?.error ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="intelligence-page">
      <div className="intelligence-header">
        <div>
          <p className="eyebrow">SMARTTRACK AI</p>
          <h1>Job Description Intelligence</h1>
          <p>
            Understand a job description, identify important skills and discover
            what employers are looking for.
          </p>
        </div>
      </div>

      <div className="jd-analyzer-card">
        <div className="card-header">
          <div>
            <h2>Analyze a Job Description</h2>
            <p>Paste the complete job description below.</p>
          </div>
        </div>

        <textarea
          className="jd-input"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description here..."
        />

        <div className="analyze-footer">
          <span>{jobDescription.length} characters</span>

          <button
            className="analyze-button"
            onClick={analyzeJD}
            disabled={loading || !jobDescription.trim()}
          >
            {loading ? "Analyzing..." : "Analyze JD"}
          </button>
        </div>
      </div>

      {error && (
        <div className="ai-error-message" role="alert">
          {error}
        </div>
      )}

      {analysis && (
        <div className="analysis-section">
          <div className="section-title">
            <p className="eyebrow">AI ANALYSIS</p>
            <h2>Job Intelligence Report</h2>
          </div>

          <div className="overview-grid">
            <div className="info-card">
              <span>Role</span>
              <h3>{analysis.role}</h3>
            </div>

            <div className="info-card">
              <span>Experience</span>
              <h3>{analysis.experience}</h3>
            </div>
          </div>

          <div className="analysis-grid">
            <div className="result-card">
              <h3>Required Skills</h3>

              <div className="skills-container">
                {analysis.requiredSkills.map((skill, index) => (
                  <span className="skill-badge required" key={index}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="result-card">
              <h3>Preferred Skills</h3>

              <div className="skills-container">
                {analysis.preferredSkills.length > 0 ? (
                  analysis.preferredSkills.map((skill, index) => (
                    <span className="skill-badge preferred" key={index}>
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="empty-result">
                    No preferred skills identified.
                  </p>
                )}
              </div>
            </div>

            <div className="result-card full-width">
              <h3>Responsibilities</h3>

              {analysis.responsibilities.length > 0 ? (
                <ul className="responsibilities-list">
                  {analysis.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="empty-result">No responsibilities identified.</p>
              )}
            </div>

            <div className="result-card full-width">
              <h3>Important Keywords</h3>

              <div className="skills-container">
                {analysis.keywords.map((keyword, index) => (
                  <span className="skill-badge keyword" key={index}>
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Intelligence;
