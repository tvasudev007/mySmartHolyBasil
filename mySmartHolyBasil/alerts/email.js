// JavaScript source code
// JavaScript source code
var nodemailer = require('nodemailer');
var owner = "tvasudev17@gmail.com";
var guest = "pratikbansal15@gmail.com";

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: { user: "myconnectedthings007@gmail.com", pass: "tvasudev007" },
    tls: { rejectUnauthorized: false }
});

exports.sendEmail = function (address, subject, message) {
    var mailOptions = { to: address, subject: subject, text: message }

    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);

        }
        else {
            console.log("Message sent: " + response.message);

        }
    });
}