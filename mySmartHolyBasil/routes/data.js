﻿'use strict';
var express = require('express');
var router = express.Router();
var db = require('../db/dbHandler');

/* GET home page. */
router.get('/', function (req, res) {
    
    db.fetchLatest(db.get(), function (data) {
        res.send(JSON.stringify(data));
    })
    
    //res.render('index', { title: 'Express' });
});

router.get('/moisture', function (req, res) {
    
    res.send("latest moisture Value is : " + moisture)
    //res.render('index', { title: 'Express' });
});

router.get('/temperature', function (req, res) {

    res.send("latest temperature Value is : " + temperature)
    //res.render('index', { title: 'Express' });
});

router.get('/humidity', function (req, res) {

    res.send("latest humidty Value is : " + humidity)
    //res.render('index', { title: 'Express' });
});

module.exports = router;
