import { createContext, useState, useEffect } from "react";
import { api, getAuthHeaders } from "../api/axios";

export const JobsContext = createContext(null);

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ status: "all", sort: "" });

  // Fetch All Jobs
  const fetchJobs = async (sort = "") => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get(
        `/jobs?status=${filters.status}&sort=${filters.sort}`,
        {
          headers: getAuthHeaders(),
        },
      );

      setJobs(res.data.jobs);
    } catch (error) {
      setError("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchJobs();
    }
  }, [filters]);

  // Add New Job
  const addJob = async (jobData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/jobs", jobData, {
        headers: getAuthHeaders(),
      });

      const newJob = res.data.job;

      setJobs((prev) => [...prev, newJob]);
    } catch (error) {
      setError("Failed to add job");
    } finally {
      setLoading(false);
    }
  };

  // Update Job
  const updateJob = async (jobId, updatedData) => {
    setError(null);

    const previousJob = jobs.find((job) => job._id === jobId);
    if (!previousJob) return;

    setJobs((prev) =>
      prev.map((job) => (job._id === jobId ? { ...job, ...updatedData } : job)),
    );

    try {
      const res = await api.patch(`/jobs/${jobId}`, updatedData, {
        headers: getAuthHeaders(),
      });
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job._id === jobId ? res.data.job : job)),
      );
    } catch (error) {
      setJobs((prev) =>
        prev.map((job) => (job._id === jobId ? previousJob : job)),
      );

      setError("Failed to update job");
    }
  };

  // Update Job Details
  const updateJobDetails = async (jobId, updatedData) => {
    setError(null);

    try {
      const res = await api.put(`/jobs/${jobId}/details`, updatedData, {
        headers: getAuthHeaders(),
      });

      setJobs((prevJobs) =>
        prevJobs.map((job) => (job._id === jobId ? res.data.job : job)),
      );

      return { success: true };
    } catch (error) {
      setError("Failed to update job details");
      return { success: false };
    }
  };

  // Delete Job
  const deleteJob = async (jobId) => {
    setError(null);

    const previousJobs = jobs;

    setJobs((prev) => prev.filter((job) => job._id !== jobId));

    try {
      const res = await api.delete(`/jobs/${jobId}`, {
        headers: getAuthHeaders(),
      });
    } catch (error) {
      setJobs(previousJobs); //RollBack

      setError("Failed to delete job");
    }
  };

  // Fetch Job Stats
  const fetchJobStats = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get("/jobs/stats", {
        headers: getAuthHeaders(),
      });
      return res.data.stats;
    } catch (error) {
      setError("Failed to fetch job stats");
    } finally {
      setLoading(false);
    }
  };

  return (
    <JobsContext.Provider
      value={{
        jobs,
        loading,
        error,
        fetchJobs,
        addJob,
        updateJob,
        updateJobDetails,
        deleteJob,
        fetchJobStats,
        filters,
        setFilters,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
};
