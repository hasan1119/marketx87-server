/* Authentication Routes */

const express = require('express');
const registerDataValidators = require('../middlewares/registerDataValidators');
const registerDataValidatorResult = require('../middlewares/registerDataValidatorResult');
const { register, login, checkLoggedIn, logout, verifyEmail, resetPassword, verifyOTP, createPasswordAndLogin, updatePassword } = require('../controllers/auth');
const loginDataValidators = require('../middlewares/loginDataValidators');
const loginDataValidatorResult = require('../middlewares/loginDataValidationResult');
const checkLogin = require('../middlewares/checkLogin');
const router = express.Router();

// Register
router.post(
    '/register',
    registerDataValidators,
    registerDataValidatorResult,
    register
);

// Verify Email
router.post(
    '/verify-email',
    registerDataValidators,
    registerDataValidatorResult,
    verifyEmail
)

// reset password
router.post(
    "/reset-password",
    resetPassword
)

// verify OTP And Login
router.post(
    "/verify-otp",
    verifyOTP
)


// create-password-and-login
router.post(
    "/create-password-and-login",
    createPasswordAndLogin
)




// Login 
router.post(
    '/login',
    loginDataValidators,
    loginDataValidatorResult,
    login
);


// checkL logged in user
router.get(
    '/checkLogIn',
    checkLogin,
    checkLoggedIn
)

// checkL logged in user
router.post(
    '/logout',
    checkLogin,
    logout
)



module.exports = router;