const express = require("express");
const router = express.Router();
const Condition = require("../models/Condition");

// Get all conditions for a user
router.get("/:userId", async (req, res) => {
  const conditions = await Condition.find({ userId: req.params.userId });
  res.json(conditions);
});

// Create a new condition
router.post("/", async (req, res) => {
  const { userId, name, description } = req.body;
  const newCondition = await Condition.create({ userId, name, description });
  res.json(newCondition);
});

// Update a condition
router.put("/:id", async (req, res) => {
  const updated = await Condition.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete a condition
router.delete("/:id", async (req, res) => {
  await Condition.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
