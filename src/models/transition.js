const mongoose = require("mongoose");

const transSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    trans: {
      type: String,
      required: true,
    },
    account: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["activation"],
      required: true,
    },
    title: String,
  },
  { timestamps: true }
);

const Trans = mongoose.model("Trans", transSchema);
module.exports = Trans;
