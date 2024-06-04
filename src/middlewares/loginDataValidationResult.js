//dependencies
const { validationResult } = require("express-validator");

//user validator
const loginDataValidatorResult = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    const user = req.body;

    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        const formattedErrors = {
            status: "error",
        };
        for (let err in mappedErrors) {
            formattedErrors[err] = mappedErrors[err].msg;
        }
        return res.status(400).send(formattedErrors);
    }
};

//export
module.exports = loginDataValidatorResult;
