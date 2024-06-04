const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
    jobTitle: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ['pending', 'approved'],
        default: 'pending'
    },
    companyName: {
        type: String,
        trim: true
    },
    companyAddress: {
        type: String,
        required: true,
        trim: true
    },
    companyPhone: {
        type: String,
        required: true,
        trim: true
    },
    companyEmail: {
        type: String,
        required: true,
        trim: true
    },
    applicationMethod: {
        type: String,
        required: true,
        trim: true
    },
    jobIndustry: {
        type: String,
        required: true,
        trim: true
    },
    jobDescription: {
        type: String,
        required: true,
        trim: true
    },
    appointmentDate: {
        type: String,
        required: true,
        trim: true
    }

}, { timestamps: true })

const Job = mongoose.model("Job", jobSchema)
module.exports = Job;