//dependencies
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// check login Middleware
const checkLogin = async (req, res, next) => {
  try {
    if (req?.signedCookies?.access_token) {
      const token = req.signedCookies.access_token.split(" ")[1];
      const decode = await jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findOne({
        _id: decode.id,
      });
      if (user === null) {
        console.log("not login");
        return res.status(401).send({
          status: "Unauthorized",
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
          status: "Unauthorized",
        });
      }
    } else {
      return res.status(401).send({
        status: "Unauthorized",
      });
    }
  } catch (error) {
    console.log(error);
    if (error.message === "jwt expired") {
      return res.status(401).send({
        status: "Unauthorized",
      });
    }
    next(error);
  }
};

// exports
module.exports = checkLogin;
