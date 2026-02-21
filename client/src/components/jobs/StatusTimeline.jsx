import styles from "../jobs-styles/StatusTimeline.module.css";

const StatusTimeline = ({ job, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <h3 className={styles.modalTitle}>Status Timeline</h3>

        <div className={styles.timeline}>
          {job.statusHistory.map((entry, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div>
                <p className={styles.timelineStatus}>{entry.status}</p>
                <p className={styles.timelineDate}>
                  {new Date(entry.changedAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={onClose} className={styles.btnSecondary}>
          Close
        </button>
      </div>
    </div>
  );
};

export default StatusTimeline;
