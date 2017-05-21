var nodemailer = require('nodemailer');
var constants = require('.././constants');

//logs
const winston = require('winston');
//winston.level =  'debug';

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: constants.logDirPath + 'db.log' })
    ]
});


logger.level = 'debug';

const assert = require('assert');
const uuid = require('uuid');
const uid = uuid.v1();

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: { user: constants.operatorEmailId, pass: constants.operatorPassword },
    tls: { rejectUnauthorized: false }
});

exports.sendEmail = function (userEmailId, subject, message) {
    var mailOptions = { to: userEmailId, subject: subject, text: message }

    smtpTransport.sendMail(mailOptions, function (err, response) {
        try {
            assert.equal(err, null);
            logger.log('info', "Email sent: " + response);
        }
        catch (err) {
            console.log(err);
        }
        
       
       
    });
}