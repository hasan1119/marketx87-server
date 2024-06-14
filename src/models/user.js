const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      maxlength: 20,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: [true, "Email should be unique"],
      validate: {
        validator: function (v) {
          return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          );
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },

    phone: {
      type: String,
      trim: true,
      maxlength: 20,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    role: [
      {
        type: String,
        enum: ["SuperAdmin", "Admin", "Member", "Manager"],
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Awaiting", "Active", "Suspended", "Blocked"],
    },
    password: {
      type: String,
      required: true,
    },
    job: {
      type: mongoose.Types.ObjectId,
      ref: "Job",
    },
    avatar: {
      type: String,
      default: "",
    },
    address: {
      present: {
        country: {
          type: String,
        },
        city: {
          type: String,
        },
        street: {
          type: String,
        },
      },
      permanent: {
        country: {
          type: String,
        },
        city: {
          type: String,
        },
        street: {
          type: String,
        },
      },
    },
    OTP: {
      type: String,
      maxlength: 4,
    },
    education: {
      educationLevel: { type: String },
      examTitle: { type: String },
      institutionName: { type: String },
      currentlyStudying: { type: Boolean },
      passingYear: { type: String },
      approximatePassingYear: { type: String },
      currentYear: { type: String },
    },
    transitions: [
      {
        type: {
          type: String,
          enum: ["Activation"],
        },
        transition: {
          type: mongoose.Types.ObjectId,
          ref: "Trans",
        },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
