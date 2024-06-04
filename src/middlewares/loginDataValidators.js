//dependencies
const { check } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const loginDataValidators = [
    check("email")
        .trim()
        .notEmpty()
        .withMessage("email is required!")
        .custom(async (value, { req }) => {
            try {
                const user = await User.findOne({ email: new RegExp(value, "i") });

                if (user !== null) {

                    req.user = user;

                    return Promise.resolve();
                } else {
                    return Promise.reject();
                }
            } catch (error) {
                throw createHttpError(500, error);
            }
        })
        .withMessage("No user found!"),

    check("password")
        .notEmpty()
        .withMessage("Password is required!")
        .custom(async (value, { req }) => {
            if (req.user) {
                const isPasswordMatch = await bcrypt.compare(value, req.user.password);

                if (isPasswordMatch) return Promise.resolve();

                return Promise.reject();
            } else {
                return Promise.resolve();
            }
        })
        .withMessage("Wrong Login Info"),
];

//export
module.exports = loginDataValidators;
