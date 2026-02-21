const JobApplication = require("../models/JobApplication");
const ALLOWED_STATUS = ["Applied", "Interview", "Offer", "Rejected"];

module.exports.addJob = async (req, res) => {
  const userId = req.user.id;
  const {
    company,
    position,
    location,
    currentStatus,
    salary,
    appliedDate,
    followUpDate,
    jobLink,
    notes,
  } = req.body;

  if (!company || !position || !appliedDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let status = currentStatus;
  if (!ALLOWED_STATUS.includes(status)) {
    status = "Applied";
  }

  const jobObj = {
    userId,
    company,
    position,
    location,
    currentStatus: status,
    salary,
    appliedDate,
    followUpDate,
    jobLink,
    notes,
  };

  const newJob = await JobApplication.create(jobObj);

  return res
    .status(200)
    .json({ message: "Job Created Successfully", job: newJob });
};

module.exports.getAllJobs = async (req, res) => {
  const userId = req.user.id;
  const { sort, status } = req.query;

  const queryObject = { userId };

  if (status && status !== "all") {
    queryObject.currentStatus = status;
  }

  let sortOptions = { appliedDate: -1 };

  if (sort === "currentStatus") {
    sortOptions = { currentStatus: 1 };
  }

  if (sort === "followUpDate") {
    sortOptions = { followUpDate: 1 };
  }

  const jobs = await JobApplication.find(queryObject).sort(sortOptions);

  return res.status(200).json({ jobs });
};

module.exports.updateJobStatus = async (req, res) => {
  const userId = req.user.id;
  const jobId = req.params.id;
  const { newStatus } = req.body;

  if (!ALLOWED_STATUS.includes(newStatus)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const job = await JobApplication.findOne({ _id: jobId, userId });
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  if (job.currentStatus === newStatus) {
    return res.status(400).json({
      message: "Job already in this status",
    });
  }

  if (job.statusHistory.length === 0) {
    job.statusHistory.push({
      status: job.currentStatus,
      changedAt: job.appliedDate || new Date(),
    });
  }

  job.statusHistory.push({
    status: newStatus,
    changedAt: new Date(),
  });

  job.currentStatus = newStatus;

  await job.save();

  return res.status(200).json({
    message: "Job status updated successfully",
    job,
  });
};

module.exports.updateJobDetails = async (req, res) => {
  const userId = req.user.id;
  const jobId = req.params.id;

  const {
    company,
    position,
    location,
    salary,
    appliedDate,
    followUpDate,
    jobLink,
    notes,
  } = req.body;

  const job = await JobApplication.findOne({ _id: jobId, userId });

  if (!job) {
    return res.status(400).json({ message: "Job not found" });
  }

  job.company = company ? company : job.company;
  job.position = position ? position : job.position;
  job.location = location ? location : job.location;
  job.salary = salary ? salary : job.salary;
  job.appliedDate = appliedDate ? appliedDate : job.appliedDate;
  job.followUpDate = followUpDate ? followUpDate : job.followUpDate;
  job.jobLink = jobLink ? jobLink : job.jobLink;
  job.notes = notes ? notes : job.notes;

  await job.save();

  res.status(200).json({
    message: "Job updated successfully",
    job,
  });
};

module.exports.deleteJob = async (req, res) => {
  const userId = req.user.id;
  const jobId = req.params.id;

  const job = await JobApplication.findOneAndDelete({ _id: jobId, userId });
  if (!job) {
    return res.status(404).json({ message: "Job Not Found" });
  }

  return res.status(200).json({ message: "Job deleted successfully", job });
};

module.exports.getJobStats = async (req, res) => {
  const userId = req.user.id;

  const jobs = await JobApplication.find({ userId }).select("currentStatus");

  const stats = {
    total: jobs.length,
    Applied: 0,
    Interview: 0,
    Offer: 0,
    Rejected: 0,
  };

  jobs.forEach((job) => {
    stats[job.currentStatus]++;
  });

  res.status(200).json({ stats });
};
