const mongoose = require("mongoose");

const recordsSchema = mongoose.Schema(
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
      enum: ["Awaiting", "Approved", "Rejected"],
    },
  },
  { timestamps: true }
);

const Record = mongoose.model("Record", recordsSchema);
module.exports = Record;
