const mongoose = require("mongoose");

const healthLogSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    conditionId: { type: String, required: false }, // optional link to a condition
    type: { type: String, required: true }, // e.g., "Blood Pressure"
    value: { type: String, required: true }, // e.g., "120/80"
    note: { type: String }, // optional note
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HealthLog", healthLogSchema);
