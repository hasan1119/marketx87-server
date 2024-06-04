//dependencies
const { check } = require('express-validator');
const User = require('../models/user');


const registerDataValidators = [
    //  first name
    check('firstName')
        .notEmpty()
        .withMessage('First name is required!')
        .escape()
        .trim()
        .isLength({ min: 1 })
        .withMessage('Name is required!'),
    // last name
    check('lastName').escape(),
    // email
    check('email')
        .escape()
        .notEmpty()
        .withMessage('Email is required!')
        .escape()
        .toLowerCase()
        .trim()
        .isEmail()
        .withMessage('Email is invalid!')
        .custom(async (value, { req }) => {
            try {
                const user = await User.findOne(
                    {
                        email: new RegExp(value, "i")
                    },
                    { email: 1, status: 1 }
                );
                console.log(user);
                if (user && user.status === 'verified') {
                    return Promise.reject();
                } else {
                    req.user = user;
                    return true;
                }
            } catch (error) {
                throw createHttpError(500, error);
            }
        })
        .withMessage('Email already in use!'),
    // password
    check('password')
        .notEmpty()
        .withMessage('Password is required!')
        .isStrongPassword()
        .withMessage('Password is not strong!')
        .custom((value, { req }) => {
            req.password = value;
            return true;
        }),

    // confirm password
    check('confirmPassword')
        .notEmpty()
        .withMessage('Confirm Password is required!')
        .escape()
        .custom((val, { req }) => {
            if (req.password === val) return true;
            return false;
        })
        .withMessage("Password doesn't match!"),
];

//export
module.exports = registerDataValidators;
