/* Admin Routes */

const express = require('express');
const { getAllJobReports, getSingleReport } = require('../controllers/public');
const router = express.Router();


router.get('/job-reports', getAllJobReports)
router.get('/reports/:id', getSingleReport)
// router.get(`/users`, checkLogin, checkAdmin, getAllUsers)

module.exports = router;