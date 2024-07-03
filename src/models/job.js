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
  description: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  budget: {
    type: Number,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["hidden", "active", "completed", "stopped"],
  },
  records: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      record: {
        type: mongoose.Types.ObjectId,
        ref: "Record",
      },
    },
  ],
});

// Check if the model already exists before compiling it
const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);

module.exports = Job;
