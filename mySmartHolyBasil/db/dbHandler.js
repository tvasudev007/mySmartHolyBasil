// database source code

var MongoClient = require('mongodb').MongoClient;
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

const collectionName = 'myHolyBasilData';

var state = {
    db: null,
}

exports.connect = function (url, done) {
    if (state.db) return done()

    MongoClient.connect(url, function (err, db) {
        if (err) return done(err)
        state.db = db
        done()
    })
}

exports.get = function () {
    return state.db
}

exports.insert = function (db,data) {
    
        db.collection(collectionName).insertOne( data , function (err, result) {
            assert.equal(err, null);
            logger.log('verbose',"Inserted a document into the myHolyBasilData collection. " + JSON.stringify(data) );
            
        });
   
}
exports.fetchLatest = function (db,done) {
    var collection = db.collection(collectionName);
    var cursor = collection.find().limit(1).sort({ $natural: -1 });
    
    cursor.toArray(function (err, results) {
        if (err) throw err;
        console.log('%j', results);
        done(results);
    });
    
}

exports.close = function (done) {
    if (state.db) {
        state.db.close(function (err, result) {
            state.db = null
            state.mode = null
            done(err)
        })
    }
}
 


