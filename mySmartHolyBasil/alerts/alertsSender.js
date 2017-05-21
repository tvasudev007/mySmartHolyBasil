var db = require('../db/dbHandler');

var constants = require('.././constants');

var sms = require('./sms');
var email = require('./email');

var assert = require('assert');

var sendNotifications = function (type) {
    db.connect(constants.dbURL, function (err, dbObj) {
        assert.equal(err, null)
        db.fetchAllService(db.get({ "role": "admin" }), { username: true, number: true, emailId: true, _id: false }, "alertSubscribers", function (err, response) {
            assert.equal(err, null);
            db.fetchLatest(dbObj, function (data) {
                console.log(data);
                var message = " Please pour water Moisture level is " + data[0].moisture + " % ";
                for (var i = 0; i < response.length; i++) {
                    sms.sendSMS(response[i].number, constants.operatorNumber, message);
                    email.sendEmail(response[i].emailId, type, message);
                }
            })
            
        })
    })
}

calibrateEvent.on("critical", function (moistureLevel) {
    sendNotifications("critical");
});
calibrateEvent.on("warning", function (moistureLevel) {
    sendNotifications("warning");
});


