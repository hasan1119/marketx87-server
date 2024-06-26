//dependencies
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Trans = require("../models/transition");

// check login Middleware
const checkLogin = async (req, res, next) => {
  try {
    if (req?.signedCookies?.access_token) {
      const token = req.signedCookies.access_token.split(" ")[1];
      const decode = await jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findOne({
        _id: decode.id,
      }).populate({
        path: "transitions.transition",
        model: "Trans", // Ensure 'Transition' is the correct model name
      });
      if (user === null) {
        console.log("not login");
        return res.status(401).send({
          status: "Unauthorized 1",
        });
      }

      if (decode.id) {
        req.id = decode.id;
        req.token = token;
        user.OTP = undefined;
        user.password = undefined;
        req.user = user;
        next();
      } else {
        return res.status(401).send({
          status: "Unauthorized 2",
        });
      }
    } else {
      return res.status(401).send({
        status: "Unauthorized 3",
      });
    }
  } catch (error) {
    console.log(error);
    if (error.message === "jwt expired") {
      return res.status(401).send({
        status: "Unauthorized 4",
      });
    }
    next(error);
  }
};

// exports
module.exports = checkLogin;
