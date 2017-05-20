'use strict';
var express = require('express');
var router = express.Router();
var db = require('../db/dbHandler');

/* GET home page. */
router.get('/', function (req, res) {

    
        res.send("Welcome to My Connected Holy Basil Subscriber service");
    

    //res.render('index', { title: 'Express' });
});



module.exports = router;
