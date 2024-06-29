/* Admin Routes */

const express = require("express");
const {
  getAllJobReports,
  changeReportStatus,
  deleteReport,
  getAllUsers,
  changeUserStatus,
  createBlog,
  createJob,
  getAllJobs,
  getAllRecords,
  changeRecordStatus,
} = require("../controllers/admin");
const checkAdmin = require("../middlewares/checkAdmin");
const checkLogin = require("../middlewares/checkLogin");
const router = express.Router();

router.get("/all-records", checkLogin, checkAdmin, getAllRecords);
router.put(
  "/changeRecordStatus/:recordId",
  checkLogin,
  checkAdmin,
  changeRecordStatus
);
router.put("/change-report-status", checkLogin, checkAdmin, changeReportStatus);
router.delete(`/delete-report/:id`, checkLogin, checkAdmin, deleteReport);
router.get(`/admin/users`, checkLogin, checkAdmin, getAllUsers);
//blog routes
router.post("/create-blog", checkLogin, checkAdmin, createBlog);
router.post(`/create-job`, checkLogin, checkAdmin, createJob);
router.get(`/jobs`, checkLogin, checkAdmin, getAllJobs);
router.put(
  `/admin/change-user-status`,
  checkLogin,
  checkAdmin,
  changeUserStatus
);

module.exports = router;
