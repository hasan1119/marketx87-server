const createHttpError = require('http-errors');
const User = require('../models/user');
const { hashPassword } = require('../utils/passwordUtils');
const fs = require('fs');
const path = require('path');
const { imagConfig } = require('../utils/fileUpload.config');
const Job = require('../models/job');
const Blog = require('../models/blog');

// update password
const updatePassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          password: await hashPassword(password),
        },
      }
    );
    res.send(user);
  } catch (error) {
    console.log(error);
    return next(createHttpError(error));
  }
};

// update info
const updateInfo = async (req, res, next) => {
  try {
    const { firstName, lastName, email, prevAvatar, phone, gender } = req.body;
    const files = req.files;
    const filename = files && files[0]?.filename;

    // if (prevAvatar)
    //     fs.unlinkSync(path.join(imagConfig.profile.DIR + '/' + prevAvatar));

    const obj = filename
      ? {
          firstName,
          lastName,
          phone,
          gender,
          avatar: filename,
        }
      : {
          firstName,
          lastName,
          phone,
          gender,
        };

    console.log(obj);

    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: obj,
      },
      { new: true }
    );
    res.send(user);
  } catch (error) {
    console.log(error);
    return next(createHttpError(error));
  }
};

// create JOb Report
const createJObReport = async (req, res, next) => {
  try {
    const jobObj = req.body;
    const job = await Job.findOneAndUpdate(
      { user: req.user._id },
      {
        $set: {
          ...jobObj,
        },
      },
      { upsert: true, new: true }
    );

    const user = await User.findOneAndUpdate(
      { _id: job.user },
      { $set: { job: job._id, status: 'pending' } },
      { new: true }
    );
    await Job.populate(user, { path: 'job' });
    user.password = undefined;
    user.OTP = undefined;

    res.send(user);
  } catch (error) {
    console.log(error);
    return next(createHttpError(error));
  }
};

// add address
const addAddress = async (req, res, next) => {
  try {
    const addressObj = req.body;
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          address: addressObj,
        },
      },
      { new: true }
    );
    await Job.populate(user, { path: 'job' });
    user.password = undefined;
    user.OTP = undefined;

    res.send(user);
  } catch (error) {
    console.log(error);
    return next(createHttpError(error));
  }
};

// add Education
const addEducation = async (req, res, next) => {
  try {
    const educationObject = req.body;
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          education: educationObject,
        },
      },
      { new: true }
    );
    await Job.populate(user, { path: 'job' });
    user.password = undefined;
    user.OTP = undefined;

    res.send(user);
  } catch (error) {
    console.log(error);
    return next(createHttpError(error));
  }
};

// create JOb Report
const createBlog = async (req, res, next) => {
  try {
    const blogObj = req.body;
    console.log(blogObj);
    const blog = await Blog.create(blogObj);
    res.send(blog);
  } catch (error) {
    console.log(error);
    return next(createHttpError(error));
  }
};

// get all blogs
const getBlogs = async (req, res, next) => {
  try {
    const blog = await Blog.find();
    res.send(blog);
  } catch (error) {
    console.log(error);
    return next(createHttpError(error));
  }
};

module.exports = {
  updatePassword,
  updateInfo,
  createJObReport,
  addAddress,
  addEducation,
  createBlog,
  getBlogs,
};
