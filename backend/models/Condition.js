const mongoose = require("mongoose");

const conditionSchema = new mongoose.Schema(
  {
    userId: { type: String, index: true }, //Optional (frontend passes it)
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
  },

  { timestamps: true }
);

conditionSchema.index({ userId: 1, creaatedAt: -1});

module.exports = mongoose.model("Condition", conditionSchema);
