var twilio = require('twilio');
var constants = require('.././constants');


constants.accountSid = accountSid;

constants.authToken = authToken;



var twilioClient = twilio(accountSid, authToken);


exports.sendSMS = function (userNumber, operatorNumber, smsContent ) {

    twilioClient.messages.create({
        body: smsContent,
        to: userNumber,  // Text this number
        from: constants.operatorNumber // From a valid Twilio number
    }).then((message) => console.log(message.sid));
}
