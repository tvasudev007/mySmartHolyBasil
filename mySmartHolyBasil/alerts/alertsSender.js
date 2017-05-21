var db = require('../db/dbHandler');

var constants = require('.././constants');

var sms = require('./sms');
var email = require('./email');

var assert = require('assert');

var sendNotifications = function () {
    db.connect(constants.dbURL, function (err, dbObj) {
        assert.equal(err, null)
        db.fetchAllService(db.get({ "role": "admin" }), { username: true, number: true, email: true, _id: false }, "alertSubscribers", function (err, response) {
            assert.equal(err, null);
            console.log(response);
        })
    })
}

calibrateEvent.on("critical", function (moistureLevel) {
    sendNotifications();
});
calibrateEvent.on("warning", function (moistureLevel) {
    sendNotifications();
});


