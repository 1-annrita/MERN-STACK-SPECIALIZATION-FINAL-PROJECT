const express = require("express");
const router = express.Router();
const HealthLog = require("../models/HealthLog");

// List logs (optionally filtered by userId or conditionId)
router.get("/", async (req, res) => {
  try {
    const { userId, conditionId } = req.query;
    const filter = { ...(userId && { userId }), ...(conditionId && { conditionId }) };
    const logs = await HealthLog.find(filter).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Create log
router.post("/", async (req, res) => {
  try {
    const { userId, conditionId, type, value, note } = req.body;
    if (!type || !value) return res.status(400).json({ message: "Type and value are required" });
    const log = await HealthLog.create({ userId, conditionId, type, value, note });
    res.status(201).json(log);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update log
router.put("/:id", async (req, res) => {
  try {
    const updated = await HealthLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Health log not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete log
router.delete("/:id", async (req, res) => {
  try {
    const result = await HealthLog.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) return res.status(404).json({ message: "Health log not found" });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
