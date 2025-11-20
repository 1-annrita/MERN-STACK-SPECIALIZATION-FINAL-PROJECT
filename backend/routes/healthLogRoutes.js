const express = require("express");
const router = express.Router();
const HealthLog = require("../models/HealthLog");

// Get logs for a condition
router.get("/:conditionId", async (req, res) => {
  const logs = await HealthLog.find({ conditionId: req.params.conditionId });
  res.json(logs);
});

// Create a new log
router.post("/", async (req, res) => {
  const newLog = await HealthLog.create(req.body);
  res.json(newLog);
});

module.exports = router;
