const express = require("express");
const router = express.Router();

const { analyzeJD, matchResume } = require("../controllers/aiController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/analyze-jd", authMiddleware, analyzeJD);
router.post("/match-resume", authMiddleware, matchResume);

module.exports = router;
