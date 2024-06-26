const mongoose = require("mongoose");

const submittedJobSchema = mongoose.Schema(
  {
    job: {
      type: mongoose.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Awaiting", "Approved", "Cancel"],
    },
  },
  { timestamps: true }
);

const SubmittedJob = mongoose.model("SubmittedJob", submittedJobSchema);
module.exports = SubmittedJob;
