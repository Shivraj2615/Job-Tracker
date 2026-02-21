import { useContext, useEffect, useState } from "react";
import { JobsContext } from "../context/JobsContext";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { fetchJobStats } = useContext(JobsContext);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchJobStats().then(setStats);
  }, [fetchJobStats]);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h2>Dashboard</h2>

      {/* Big Total Card */}
      <div className={styles.totalCard}>
        <p>Total Applications</p>
        <h1>{stats.total}</h1>
      </div>

      {/* Status List */}
      <div className={styles.statusList}>
        <div className={`${styles.statusItem} ${styles.applied}`}>
          <span>Applied</span>
          <span>{stats.Applied}</span>
        </div>

        <div className={`${styles.statusItem} ${styles.interview}`}>
          <span>Interview</span>
          <span>{stats.Interview}</span>
        </div>

        <div className={`${styles.statusItem} ${styles.offer}`}>
          <span>Offer</span>
          <span>{stats.Offer}</span>
        </div>

        <div className={`${styles.statusItem} ${styles.rejected}`}>
          <span>Rejected</span>
          <span>{stats.Rejected}</span>
        </div>
      </div>
    </div>
  );
}
