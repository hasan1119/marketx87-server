const createHttpError = require("http-errors");
const User = require("../models/user");
const { hashPassword } = require("../utils/passwordUtils");
const fs = require('fs');
const path = require('path');
const { imagConfig } = require("../utils/fileUpload.config");
const Job = require("../models/job");


// update password
const getAllJobReports = async (req, res, next) => {
    try {
        const jobs = await Job.find();


        res.send(jobs)

    } catch (error) {
        console.log(error);
        return next(createHttpError(error));
    }
}

// change status
const changeReportStatus = async (req, res, next) => {
    try {
        const { id, status } = req.body;
        const job = await Job.findOneAndUpdate({ _id: id }, { $set: { status } }, { new: true });
        console.log(job);
        res.send(job)

    } catch (error) {
        console.log(error);
        return next(createHttpError(error));
    }
}

// deleteReport
const deleteReport = async (req, res, next) => {
    try {
        const { id } = req.params;
        const job = await Job.findOneAndDelete({ _id: id }, { new: true })
        res.send(job)

    } catch (error) {
        console.log(error);
        return next(createHttpError(error));
    }
}


const getAllUsers = async (req, res, next) => {
    try {

        const users = await User.find()
        res.send(users)

    } catch (error) {
        console.log(error);
        return next(createHttpError(error));
    }
}



module.exports = {
    getAllJobReports,
    changeReportStatus,
    deleteReport,
    getAllUsers
}