import styles from "../jobs-styles/JobFilterSort.module.css";

export default function JobFilter({ value, onChange }) {
  return (
    <div className={styles.jobFilter}>
      <label htmlFor="status-filter">Status:</label>
      <select
        id="status-filter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="all">All</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
        <option value="Offer">Offer</option>
      </select>
    </div>
  );
}
