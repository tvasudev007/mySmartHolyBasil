var twilio = require('twilio');
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

accountSid = constants.accountSid;

authToken = constants.authToken;



var twilioClient = twilio(accountSid, authToken);


exports.sendSMS = function (userNumber, operatorNumber, smsContent ) {

    twilioClient.messages.create({
        body: smsContent,
        to: userNumber,  // Text this number
        from: constants.operatorNumber // From a valid Twilio number
    }).then((message) => logger.log('info', "SMS sent: " + message));
}
