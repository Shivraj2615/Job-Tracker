const express = require("express");
const router = express.Router();
const {
  addJob,
  getAllJobs,
  updateJobStatus,
  updateJobDetails,
  deleteJob,
  getJobStats,
} = require("../controllers/jobController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/stats", authMiddleware, getJobStats);

router.get("/", authMiddleware, getAllJobs);
router.post("/", authMiddleware, addJob);
router.patch("/:id", authMiddleware, updateJobStatus);
router.put("/:id/details", authMiddleware, updateJobDetails);
router.delete("/:id", authMiddleware, deleteJob);

module.exports = router;
