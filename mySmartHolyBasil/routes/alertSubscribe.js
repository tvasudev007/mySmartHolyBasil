'use strict';
var express = require('express');
var router = express.Router();
var db = require('../db/dbHandler');

/* GET home page. */
router.get('/', function (req, res) {

    
        res.send("Welcome to My Connected Holy Basil Subscriber service");
    

    //res.render('index', { title: 'Express' });
});

router.post('/notification', function (req, res) {
   
    db.insertService(db.get(), "alertSubscribers", req.body )
    res.send("Subscribed to My Connected Holy Basil Notification service");
});

router.post('/remove', function (req, res) {

    db.deleteService(db.get(), "alertSubscribers", req.body)
    res.send("Unsubscribed to My Connected Holy Basil Notification service");
});


module.exports = router;
