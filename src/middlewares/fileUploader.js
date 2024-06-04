// Dependencies
const upload = require('multer-uploader');
const path = require('path');

function fileUploader(uploadDirectory, maxFileSize, allowedMimeType) {
    return function uploader(req, res, next) {
        upload(uploadDirectory, maxFileSize, allowedMimeType).any()(
            req,
            res,
            (err) => {
                if (err) {
                    const error = {
                        ["avatar"]: {
                            msg: err?.message,
                        },
                    };
                    req.error = error;
                    return res.status(400).send(req.error)
                } else {
                    console.log(err);
                    next();
                }
            }
        );
    };
}

// Module Export
module.exports = fileUploader;
