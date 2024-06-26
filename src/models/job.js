const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  // Define your schema fields here
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  budget: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  budget: {
    type: String,
    required: true,
  },
  limit: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  candidates: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

// Check if the model already exists before compiling it
const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

module.exports = Job;
