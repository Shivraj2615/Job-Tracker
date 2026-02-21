import { useContext, useState } from "react";
import { JobsContext } from "../../context/JobsContext";
import styles from "../jobs-styles/EditJob.module.css";

const EditJob = ({ job, onClose }) => {
  const { loading, updateJobDetails } = useContext(JobsContext);

  const [formData, setFormData] = useState({
    company: job.company,
    position: job.position,
    location: job.location,
    salary: job.salary,
    appliedDate: job.appliedDate?.slice(0, 10),
    followUpDate: job.followUpDate?.slice(0, 10),
    jobLink: job.jobLink,
    notes: job.notes,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.company.trim() || !formData.position.trim()) {
      alert("Company and Position are required");
      return;
    }

    if (formData.followUpDate < formData.appliedDate) {
      alert("Follow-up date cannot be before applied date");
      return;
    }

    const result = await updateJobDetails(job._id, formData);

    if (result.success) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <h3 className={styles.modalTitle}>Edit Job</h3>

        <form onSubmit={handleSubmit} className={styles.editForm}>
          <div className={styles.formGroup}>
            <label>Company</label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Position</label>
            <input
              name="position"
              value={formData.position}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Salary</label>
            <input
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Applied Date</label>
            <input
              name="appliedDate"
              type="date"
              value={formData.appliedDate}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Follow Up Date</label>
            <input
              name="followUpDate"
              type="date"
              value={formData.followUpDate}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Job Link</label>
            <input
              name="jobLink"
              value={formData.jobLink}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>

          <div className={styles.modalButtons}>
            <button
              type="submit"
              className={styles.btnPrimary}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
