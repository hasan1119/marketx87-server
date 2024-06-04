// dependencies
const dotenv = require('dotenv');
const nodeMailer = require("nodemailer");
dotenv.config();


async function sendEmail(receivers, data) {
    try {


        console.log("Called the mail function")

        //sending email
        const transporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PWD
            },
            secure: true
        });

        await new Promise((resolve, reject) => {
            // verify connection configuration
            transporter.verify(function (error, success) {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log("Server is ready to take our messages");
                    resolve(success);
                }
            });
        });

        const options = {
            from: {
                name: process.env.SITE_TITLE,
                address: process.env.EMAIL
            },
            to: receivers.join(','),
            replyTo: process.env.EMAIL,
            subject: data.subject + ` - ${new Date().toLocaleString()}`,
            html: data.template,
            attachments: data.attachments
        };

        // console.log(options)


        await new Promise((resolve, reject) => {
            // send mail
            transporter.sendMail(options, (err, info) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log(info);
                    resolve(info);
                }
            });
        });



    } catch (error) {
        console.log(error);
        throw error
    }


}

module.exports = sendEmail;