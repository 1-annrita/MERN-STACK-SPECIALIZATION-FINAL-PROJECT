const express = require("express");
const router = express.Router();
const Condition = require("../models/Condition");

// GET /api/conditions?userId
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};
    const conditions = await Condition.find(filter).sort({ createdAt: -1 });
    return res.json(conditions);
  } catch (err) {
    console.error("Failed to list conditions:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
});

// Optional: keep path-param route if other clients call /api/conditions/:userId
router.get("/:userId", async (req, res) => {
  try {
    const conditions = await Condition.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    return res.json(conditions);
  } catch (err) {
    console.error("Failed to get conditions by userId:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
});

// Create a new condition
router.post("/", async (req, res) => {
  try {
    const { userId, name, description } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });
    const newCondition = await Condition.create({ userId, name, description });
    return res.status(201).json(newCondition);
  } catch (err) {
    console.error("Failed to create condition:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
});

// Update a condition
router.put("/:id", async (req, res) => {
  try {
    const updated = await Condition.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Condition not found" });
    return res.json(updated);
  } catch (err) {
    console.error("Failed to update condition:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
});

// Delete a condition
router.delete("/:id", async (req, res) => {
  try {
    const result = await Condition.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) return res.status(404).json({ message: "Condition not found" });
    return res.json({ ok: true });
  } catch (err) {
    console.error("Failed to delete condition:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
});

module.exports = router;
