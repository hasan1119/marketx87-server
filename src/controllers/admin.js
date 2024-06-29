const createHttpError = require("http-errors");
const User = require("../models/user");
const { hashPassword } = require("../utils/passwordUtils");
const fs = require("fs");
const path = require("path");
const { imagConfig } = require("../utils/fileUpload.config");
const Job = require("../models/job");
const Record = require("../models/records");

// all records
const getAllRecords = async (req, res, next) => {
  try {
    const records = await Record.find()
      .populate({ path: "user" })
      .populate({ path: "job" });
    res.send(records);
  } catch (error) {
    console.log(error);
    return next(createHttpError(error));
  }
};

// Change record status
const changeRecordStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const { recordId } = req.params;
    const record = await Record.findByIdAndUpdate(
      recordId,
      { $set: { status } },
      { new: true }
    )
      .populate({ path: "user" })
      .populate({ path: "job" });

    if (record.status === "Approved") {
      const { job: { budget } = {}, user: { _id: userId } = {} } = record;
      const user = await User.findByIdAndUpdate(
        userId,
        { $inc: { balance: budget } },
        { new: true }
      );
      console.log(user);
    }
    res.send(record);
  } catch (error) {
    console.log(error);
    return next(createHttpError(error));
  }
};

// change status
const changeReportStatus = async (req, res, next) => {
  try {
    const { id, status } = req.body;
    const job = await Job.findOneAndUpdate(
      { _id: id },
      { $set: { status } },
      { new: true }
    );
    console.log(job);
    res.send(job);
  } catch (error) {
    console.log(error);
    return next(createHttpError(error));
  }
};

// deleteReport
const deleteReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await Job.findOneAndDelete({ _id: id }, { new: true });
    res.send(job);
  } catch (error) {
    console.log(error);
    return next(createHttpError(error));
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate({
      path: "transitions.transition",
      model: "Trans", // Ensure 'Transition' is the correct model name
    });
    res.send(users);
  } catch (error) {
    console.log(error);
    return next(createHttpError(error));
  }
};

const changeUserStatus = async (req, res, next) => {
  try {
    const { userId, status } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { status } },
      { new: true }
    );
    res.send(user);
  } catch (error) {
    console.log(error);
    return next(createHttpError(error));
  }
};

// create JOb Report
const createBlog = async (req, res, next) => {
  try {
    const job = req.body;
    console.log(job);
    const blog = await Blog.create(job);
    res.send(blog);
  } catch (error) {
    console.log(error);
    return next(createHttpError(error));
  }
};

// create JObs
const createJob = async (req, res, next) => {
  try {
    const jobObj = req.body;
    const job = await Job.create({ ...jobObj, creator: req.id });
    res.send(job);
  } catch (error) {
    console.log(error);
    return next(createHttpError(error));
  }
};
// get all jobs
const getAllJobs = async (req, res, next) => {
  try {
    const job = await Job.find();
    res.send(job);
  } catch (error) {
    console.log(error);
    return next(createHttpError(error));
  }
};

module.exports = {
  getAllRecords,
  changeReportStatus,
  deleteReport,
  getAllUsers,
  changeUserStatus,
  createBlog,
  createJob,
  getAllJobs,
  changeRecordStatus,
};
