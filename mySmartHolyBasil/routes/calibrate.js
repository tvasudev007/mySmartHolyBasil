'use strict';
var express = require('express');
var router = express.Router();
var db = require('../db/dbHandler');
const assert = require('assert');

/* GET home page. */
router.get('/', function (req, res) {

    res.send("Calibrate your Thing");
    
});

router.post('/mapping', function (req, res) {

   
    if (req.body.id != null) {
        db.fetchService(db.get(), "assetCollection", req.body.id, function (err, response) {

            if (err != null){
                res.send("Error Calibrated your Thing with ID :" + req.body.id);
            }
        
            else if (response==null){
                db.insertServiceCallback(db.get(), "assetCollection", req.body, function (err, response) {
                    assert.equal(err, null);
                    res.send("Calibrated your Thing with ID:" + req.body.id);
                });
            }
            else {
                db.updateService(db.get(), "assetCollection", req.body.id,req.body, function (err, response) {
                    assert.equal(err, null);
                    res.send("Re-calibrated your Thing with ID:" + req.body.id);
                })
            }
          
          
            

        })
    }
    
    
   
});


module.exports = router;
