const express = require("express");
const router = express.Router();

const { analyzeJD } = require("../controllers/aiController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/analyze-jd", analyzeJD);

module.exports = router;
