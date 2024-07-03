const mongoose = require("mongoose");

const withdrawSchema = mongoose.Schema(
  {
    trans: {
      type: mongoose.Types.ObjectId,
      ref: "Trans",
      required: true,
    },
    status: {
      type: String,
      enum: ["Reviewing", "Approved", "Rejected"],
      required: true,
    },
    method: {
      type: String,
      enum: ["Bkash", "Nagad", "Rocket"],
      required: true,
    },
  },
  { timestamps: true }
);

const Withdraw = mongoose.model("Withdraw", withdrawSchema);
module.exports = Withdraw;
