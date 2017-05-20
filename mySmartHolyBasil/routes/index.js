'use strict';
var express = require('express');
var router = express.Router();
var db = require('../db/dbHandler');

/* GET home page. */
router.get('/', function (req, res) {
    
    db.fetchLatest(db.get(), function (data) {
        res.send("current moisture Value is : " + JSON.stringify(data));
    })
    
    //res.render('index', { title: 'Express' });
});

router.get('/moisture', function (req, res) {
    
    res.send("current moisture Value is : " + moisture)
    //res.render('index', { title: 'Express' });
});

module.exports = router;
