const createHttpError = require('http-errors');
const User = require('../models/user');
const { hashPassword } = require('../utils/passwordUtils');
const fs = require('fs');
const path = require('path');
const { imagConfig } = require('../utils/fileUpload.config');
const Job = require('../models/job');
const { isValidObjectId } = require('mongoose');

// all job reports
const getSingleReport = async (req, res, next) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.sendStatus(400)
        }
        const job = await Job.findOne({ _id: req.params.id });
        await User.populate(job, { path: 'user' });

        if (!job) {
            return res.sendStatus(400)
        }
        res.json(job);
    } catch (error) {
        console.log(error);
        return next(createHttpError(error));
    }
};


const getAllJobReports = async (req, res, next) => {
    try {
        // return res.send("OK")
        const jobs = await Job.find({ status: 'approved' });
        console.log(jobs);
        await User.populate(jobs, { path: 'user' });
        res.json(jobs);
    } catch (error) {
        console.log(error);
        return next(createHttpError(error));
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        console.log(error);
        return next(createHttpError(error));
    }
};

module.exports = {
    getAllJobReports,
    getAllUsers,
    getSingleReport
};
