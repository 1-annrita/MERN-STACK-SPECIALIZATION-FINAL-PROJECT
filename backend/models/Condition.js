const mongoose = require("mongoose");

const conditionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
});

module.exports = mongoose.model("Condition", conditionSchema);
