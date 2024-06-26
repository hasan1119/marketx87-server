//dependencies
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// check login Middleware
const checkAdmin = async (req, res, next) => {
  try {
    console.log("reached");
    if (req.user && req.user.role && req.user.role.includes("Admin")) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
};

// exports
module.exports = checkAdmin;
