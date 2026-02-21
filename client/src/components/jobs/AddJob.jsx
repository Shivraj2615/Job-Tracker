import { useContext, useState } from "react";
import { JobsContext } from "../../context/JobsContext";
import { useNavigate } from "react-router-dom";
import styles from "../jobs-styles/AddJob.module.css";

const jobObj = {
  company: "",
  position: "",
  location: "",
  currentStatus: "Applied",
  salary: "",
  appliedDate: "",
  followUpDate: "",
  jobLink: "",
  notes: "",
};

export default function AddJob() {
  const { loading, error, addJob } = useContext(JobsContext);
  const [formData, setFormData] = useState(jobObj);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((currData) => ({
      ...currData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.company || !formData.position || !formData.appliedDate) {
      alert("Company, Position & Applied Date are required");
      return;
    }

    addJob(formData);
    setFormData(jobObj);
    navigate("/jobs");
  };

  return (
    <div className={styles.jobPage}>
      <div className={styles.jobCard}>
        <h3 className={styles.jobTitle}>Add New Job</h3>

        {loading && <p className={styles.jobInfo}>Saving job...</p>}
        {error && <p className={styles.jobError}>{error}</p>}

        <form className={styles.jobForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Company *</label>
            <input
              type="text"
              name="company"
              placeholder="Google"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Position *</label>
            <input
              type="text"
              name="position"
              placeholder="Frontend Developer"
              value={formData.position}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Location</label>
            <input
              type="text"
              name="location"
              placeholder="Bangalore"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Status</label>
            <select
              name="currentStatus"
              value={formData.currentStatus}
              onChange={handleChange}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Salary</label>
            <input
              type="number"
              name="salary"
              placeholder="800000"
              value={formData.salary}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Applied Date *</label>
            <input
              type="date"
              name="appliedDate"
              value={formData.appliedDate}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Follow-up Date</label>
            <input
              type="date"
              name="followUpDate"
              value={formData.followUpDate}
              onChange={handleChange}
            />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label>Job Link</label>
            <input
              type="text"
              name="jobLink"
              placeholder="https://company.com/job"
              value={formData.jobLink}
              onChange={handleChange}
            />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label>Notes</label>
            <textarea
              name="notes"
              placeholder="HR name, referral, interview rounds..."
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <button className={styles.jobButton} type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Job"}
          </button>
        </form>
      </div>
    </div>
  );
}
