import styles from "../jobs-styles/JobRow.module.css";

export default function JobRow({
  job,
  onStatusChange,
  onEdit,
  onDelete,
  onViewHistory,
}) {
  return (
    <tr className={styles.row}>
      <td className={styles.cell}>{job.company}</td>
      <td className={styles.cell}>{job.position}</td>
      <td className={styles.cell}>{job.location || "-"}</td>

      <td className={styles.cell}>
        <select
          className={`${styles.statusSelect} ${
            job.currentStatus === "Applied"
              ? styles.applied
              : job.currentStatus === "Interview"
                ? styles.interview
                : job.currentStatus === "Offer"
                  ? styles.offer
                  : styles.rejected
          }`}
          value={job.currentStatus}
          disabled={
            job.currentStatus === "Offer" || job.currentStatus === "Rejected"
          }
          onChange={(e) => onStatusChange(job._id, e.target.value)}
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </td>

      <td className={styles.cell}>{job.salary || "-"}</td>
      <td className={styles.cell}>
        {new Date(job.appliedDate).toLocaleDateString()}
      </td>

      <td className={styles.cell}>
        {job.followUpDate
          ? new Date(job.followUpDate).toLocaleDateString()
          : "-"}
      </td>

      <td className={styles.cell}>
        {job.jobLink ? (
          <a
            href={job.jobLink}
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            View
          </a>
        ) : (
          "-"
        )}
      </td>

      <td className={styles.cell}>{job.notes || "-"}</td>

      <td className={styles.cell}>
        <div className={styles.actionsWrapper}>
          <button
            className={`${styles.button} ${styles.history}`}
            onClick={() => onViewHistory(job)}
          >
            History
          </button>

          <button
            className={`${styles.button} ${styles.edit}`}
            onClick={() => onEdit(job)}
          >
            Edit
          </button>

          <button
            className={`${styles.button} ${styles.delete}`}
            onClick={() => onDelete(job._id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
