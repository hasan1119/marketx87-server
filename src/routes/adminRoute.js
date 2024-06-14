/* Admin Routes */

const express = require("express");
const {
  getAllJobReports,
  changeReportStatus,
  deleteReport,
  getAllUsers,
  changeUserStatus,
} = require("../controllers/admin");
const checkAdmin = require("../middlewares/checkAdmin");
const checkLogin = require("../middlewares/checkLogin");
const router = express.Router();

router.get("/admin/job-reports", checkLogin, checkAdmin, getAllJobReports);
router.put("/change-report-status", checkLogin, checkAdmin, changeReportStatus);
router.delete(`/delete-report/:id`, checkLogin, checkAdmin, deleteReport);
router.get(`/admin/users`, checkLogin, checkAdmin, getAllUsers);
router.put(
  `/admin/change-user-status`,
  checkLogin,
  checkAdmin,
  changeUserStatus
);

module.exports = router;
