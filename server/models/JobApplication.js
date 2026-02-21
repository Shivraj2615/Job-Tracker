const mongoose = require("mongoose");

const STATUS_ENUM = ["Applied", "Interview", "Offer", "Rejected"];

const statusHistorySchema = new mongoose.Schema({
  status: {
    type: String,
    enum: STATUS_ENUM,
    required: true,
  },
  changedAt: {
    type: Date,
    default: Date.now,
  },
});

const jobApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    currentStatus: {
      type: String,
      enum: STATUS_ENUM,
      required: true,
      default: "Applied",
    },
    statusHistory: {
      type: [statusHistorySchema],
      default: [],
    },
    salary: {
      type: Number,
      default: 0,
    },
    appliedDate: {
      type: Date,
      required: true,
    },
    followUpDate: {
      type: Date,
    },
    jobLink: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

module.exports = JobApplication;
