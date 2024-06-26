const Job = require("../models/job");
const SubmittedJob = require("../models/submitedJob");
const User = require("../models/user");

const getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ status: { $ne: "hidden" } });
    res.send(jobs);
  } catch (error) {
    next(error);
  }
};

const getAJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);
    res.send(job);
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { title, category, budget, description, limit, time, status } =
      req.body;
    const job = await Job.findByIdAndUpdate(
      jobId,
      { $set: { title, category, budget, description, limit, time, status } },
      { new: true }
    );
    res.send(job);
  } catch (error) {
    next(error);
  }
};

const submitJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const { content } = req.body;
    const submittedJob = await SubmittedJob({
      job: jobId,
      user: req.id,
      content,
      status: "Awaiting",
    }).save();
    const user = await User.findByIdAndUpdate(req.id, {
      $addToSet: { jobs: jobId },
    });
    const job = await Job.findByIdAndUpdate(
      jobId,
      { $addToSet: { candidates: req.id } },
      { new: true }
    );
    res.send({ job, user });
  } catch (error) {
    next(error);
  }
};

module.exports = { getJobs, getAJob, updateJob, submitJob };
