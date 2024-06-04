//dependencies
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// check login Middleware
const checkAdmin = async (req, res, next) => {
  console.log(req.user);
  try {
    if (
      (req.user && req.user.role && req.user.role.includes("Admin")) ||
      req.user.role.includes("SuperAdmin")
    ) {
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
