import styles from "../jobs-styles/JobFilterSort.module.css";

export default function JobSort({ value, onChange }) {
  return (
    <div className={styles.jobSort}>
      <label htmlFor="job-sort-select">Sort by:</label>
      <select
        id="job-sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Latest Applied</option>
        <option value="currentStatus">Status</option>
        <option value="followUpDate">Follow-up Date</option>
      </select>
    </div>
  );
}
