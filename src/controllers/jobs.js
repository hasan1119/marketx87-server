const Job = require("../models/job");
const Record = require("../models/records");
const User = require("../models/user");

const getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ status: { $ne: "hidden" } })
      .populate({
        path: "records.user",
      })
      .populate({
        path: "records.record",
      });
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
    let job = await Job.findById(jobId);

    if (job.limit == job.records.length) {
      return res.status(400).send({ message: "Already completed the target!" });
    }

    if (job.limit - job.records.length == 1) {
      job = await Job.findByIdAndUpdate(
        jobId,
        { $set: { status: "completed" } },
        { new: true }
      );
    }
    const submittedJob = await Record({
      job: jobId,
      user: req.id,
      content,
      status: "Awaiting",
    }).save();

    const user = await User.findByIdAndUpdate(
      req.id,
      {
        $addToSet: { jobs: jobId },
      },
      { new: true }
    );
    job = await Job.findByIdAndUpdate(
      jobId,
      { $addToSet: { records: { user: req.id, record: submittedJob._id } } },
      { new: true }
    );
    res.send({ job, user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { getJobs, getAJob, updateJob, submitJob };
