const mongoose = require("mongoose");

const healthLogSchema = new mongoose.Schema({
  conditionId: { type: mongoose.Schema.Types.ObjectId, ref: "Condition" },
  date: { type: Date, default: Date.now },
  metrics: {
    bloodSugar: Number,
    bloodPressure: String,
    notes: String,
  },
});

module.exports = mongoose.model("HealthLog", healthLogSchema);
