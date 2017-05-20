// database source code

var MongoClient = require('mongodb').MongoClient;
var constants = require('./constants');
//logs
const winston = require('winston');
//winston.level =  'debug';

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: constants.lofDirname + 'db.log' })
    ]
});


logger.level = 'debug';

const assert = require('assert');
const uuid = require('uuid');
const uid = uuid.v1();
const sensorDBURI = "mongodb://myConnectedDB:myConnectedDBpass@myconnectedholybasil-shard-00-00-3tbdy.mongodb.net:27017/holyBasilData?ssl=true&replicaSet=myConnectedHolyBasil-shard-0&authSource=admin";
connect = function () {
   
    MongoClient.connect(sensorDBURI, function (err, db) {

        try {
            assert.notEqual(db, db);
        }
        
        catch(err){
            logger.error("Unable to connect to DB");
        }
        return db;
    
        
    });
}


exports.connect = connect;


