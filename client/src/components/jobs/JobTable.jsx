import { useContext, useState } from "react";
import { JobsContext } from "../../context/JobsContext";
import JobRow from "./JobRow";
import JobSort from "./JobSort";
import JobFilter from "./JobFilter";
import EditJob from "./EditJob";
import StatusTimeline from "./StatusTimeline";
import styles from "../jobs-styles/JobTable.module.css";

export default function JobTable() {
  const { jobs, updateJob, deleteJob, filters, setFilters } =
    useContext(JobsContext);

  const [selectedJob, setSelectedJob] = useState(null);
  const [modalType, setModalType] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      deleteJob(id);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Job Applications</h2>

      <div className={styles.controls}>
        <JobFilter
          value={filters.status}
          onChange={(value) => setFilters({ ...filters, status: value })}
        />

        <JobSort
          value={filters.sort}
          onChange={(value) => setFilters({ ...filters, sort: value })}
        />
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Location</th>
              <th>Status</th>
              <th>Salary</th>
              <th>Applied Date</th>
              <th>FollowUp Date</th>
              <th>Link</th>
              <th>Notes</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan="12" className={styles.empty}>
                  No jobs added yet
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <JobRow
                  key={job._id}
                  job={job}
                  onStatusChange={(id, status) =>
                    updateJob(id, { newStatus: status })
                  }
                  onEdit={(job) => {
                    setSelectedJob(job);
                    setModalType("edit");
                  }}
                  onViewHistory={(job) => {
                    setSelectedJob(job);
                    setModalType("history");
                  }}
                  onDelete={handleDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalType === "edit" && selectedJob && (
        <EditJob job={selectedJob} onClose={() => setModalType(null)} />
      )}

      {modalType === "history" && selectedJob && (
        <StatusTimeline job={selectedJob} onClose={() => setModalType(null)} />
      )}
    </div>
  );
}
