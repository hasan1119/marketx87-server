/* User Routes */

const express = require('express');
const checkLogin = require('../middlewares/checkLogin');
const {
  updatePassword,
  updateInfo,
  createJObReport,
  addAddress,
  addEducation,
  createBlog,
  getBlogs,
} = require('../controllers/user');
const { imagConfig } = require('../utils/fileUpload.config');
const fileUploader = require('../middlewares/fileUploader');
// const fileUploader = require('../middlewares/fileUploader');
const router = express.Router();

// password update
router.put('/update-password', checkLogin, updatePassword);

// update personal info
router.put(
  '/update-info',
  checkLogin,
  fileUploader(
    imagConfig.profile.DIR,
    imagConfig.profile.SIZE,
    imagConfig.profile.MINE
  ),
  updateInfo
);

// job routes
router.post('/create-job-report', checkLogin, createJObReport);
//blog routes
router.post('/create-blog', checkLogin, createBlog);
router.get('/blogs', getBlogs);

// add address
router.put('/add-address', checkLogin, addAddress);
router.put('/add-education', checkLogin, addEducation);

module.exports = router;
