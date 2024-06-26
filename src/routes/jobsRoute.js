/* User Routes */

const express = require("express");
const checkAdmin = require("../middlewares/checkAdmin");
const checkLogin = require("../middlewares/checkLogin");
const {
  getJobs,
  getAJob,
  updateJob,
  submitJob,
} = require("../controllers/jobs");
const router = express.Router();
router.get("/my_jobs", checkLogin, getJobs);
router.get("/job/:jobId", checkLogin, getAJob);
router.put("/job/update/:jobId", checkLogin, checkAdmin, updateJob);
router.post("/job/submit/:jobId", checkLogin, submitJob);
module.exports = router;
