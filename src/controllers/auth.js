const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { hashPassword } = require("../utils/passwordUtils");
const sendEmail = require("../utils/sendEmail");
const Job = require("../models/job");
require("dotenv").config();

function generate4DigitOTP() {
  // Generate a random 4-digit OTP
  const min = 1000;
  const max = 9999;
  const otp = Math.floor(Math.random() * (max - min + 1)) + min;
  return otp;
}

// Register
const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    let user;

    const OTP = generate4DigitOTP();

    if (req.user) {
      user = await User.findOneAndUpdate(
        { email },
        {
          $set: {
            firstName,
            lastName,
            password: await hashPassword(password),
            OTP,
          },
        },
        { new: true }
      );
    } else {
      const userObject = {
        firstName,
        lastName,
        email,
        role: ["Member"],
        password: await hashPassword(password),
        status: "Pending",
        OTP,
      };

      user = await User.create(userObject);
    }

    delete user.password;
    delete user.OTP;
    await Job.populate(user, { path: "job" });
    res.send(user);

    const emailData = {
      subject: "Verification code",
      template: `Your OTP is ${OTP}`,
      attachments: [],
    };

    await sendEmail([user.email], emailData);
  } catch (error) {
    console.log(error);
    return next(createHttpError(error));
  }
};

// verity email
const verifyEmail = async (req, res, next) => {
  try {
    const { OTP, email } = req.body;
    let user;

    if (req.user) {
      user = await User.findOneAndUpdate(
        { email, OTP },
        {
          $set: {
            status: "verified",
            OTP: "",
          },
        },
        { new: true }
      );
    } else {
      res.sendStatus(400);
    }

    if (user === null) {
      res.status(400).send({
        OTP: "Invalid OTP!",
      });
    }

    delete user.password;
    delete user.OTP;

    const token = await jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(200);
    res.cookie("access_token", "Bearer " + token, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      signed: true,
    });

    await Job.populate(user, { path: "job" });
    res.send(user);

    const emailData = {
      subject: "Verification Success",
      template: `Your account has been verified successfully`,
      attachments: [],
    };

    await sendEmail([user.email], emailData);
  } catch (error) {
    console.log(error);
    return next(createHttpError(error));
  }
};

// reset password
const resetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    // return console.log(OTP, email);
    let user;
    const OTP = generate4DigitOTP();

    user = await User.findOne({ email: email });

    if (user !== null) {
      user = await User.findOneAndUpdate(
        { email },
        {
          $set: {
            OTP,
          },
        },
        { new: true }
      );

      user.password = undefined;
      user.OTP = undefined;
      await Job.populate(user, { path: "job" });
      console.log(user);
      res.send(user);
    }

    if (user === null) {
      res.status(400).send({
        email: "User not found!",
      });
    }

    if (user !== null) {
      const emailData = {
        subject: "Password Reset",
        template: `Your password reset code: ${OTP}`,
        attachments: [],
      };

      await sendEmail([user.email], emailData);
    }
  } catch (error) {
    console.log(error);
    return next(createHttpError(error));
  }
};

// verify OTP
const verifyOTP = async (req, res, next) => {
  try {
    const { email, OTP } = req.body;
    let user;

    user = await User.findOne({ email, OTP }, { _id: 1 });

    if (user === null) {
      return res.status(400).send({
        OTP: "Invalid OTP",
      });
    }
    return res.send(user);
  } catch (error) {
    console.log(error);
    return next(createHttpError(error));
  }
};

// create password and login
const createPasswordAndLogin = async (req, res, next) => {
  try {
    const { email, OTP, password, confirmPassword } = req.body;
    let user;

    user = await User.findOne({ email, OTP }, { password: -1, OTP: -1 });

    if (user === null) {
      return res.status(400).send({
        password: "Something went wrong!",
      });
    }

    user = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          password: await hashPassword(password),
          OTP: "",
        },
      },
      { new: true }
    );

    await Job.populate(user, { path: "job" });

    const token = await jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(200);
    res.cookie("access_token", "Bearer " + token, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      signed: true,
    });

    return res.send(user);
  } catch (error) {
    console.log(error);
    return next(createHttpError(error));
  }
};

// Login
const login = async (req, res, next) => {
  const user = req.user;
  await Job.populate(user, { path: "job" });
  user.password = undefined;
  user.OTP = undefined;
  try {
    const token = await jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(200);
    res.cookie("access_token", "Bearer " + token, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      signed: true,
    });

    return res.send({
      status: "success",
      user,
    });
  } catch (error) {
    console.log(error);
    return next(createHttpError(error));
  }
};

// check logged in user
const checkLoggedIn = async (req, res, next) => {
  try {
    const user = req.user;
    delete user.password;
    await Job.populate(user, { path: "job" });
    res.send(req.user);
  } catch (error) {
    console.log(error);
    return next(createHttpError(error));
  }
};

// logout
const logout = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return next(createHttpError(error));
  }
};

module.exports = {
  register,
  login,
  checkLoggedIn,
  logout,
  verifyEmail,
  resetPassword,
  verifyOTP,
  createPasswordAndLogin,
};
