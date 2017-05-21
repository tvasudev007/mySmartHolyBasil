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

MongoClient.connect(constants.dbURL, function (err, db) {
    if (err) return done(err, null)
    state.db = db
})
exports.connect = function (url, done) {
    if (state.db) return done(null,state.db)

    MongoClient.connect(url, function (err, db) {
        if (err) return done(err,null)
        state.db = db
        done(err,state.db)
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

exports.deleteService = function (db, tableName,data,done) {

    db.collection(tableName).deleteOne( data,   function (err, results) {
            assert.equal(err, null);
            logger.log('verbose', "Removed a document into the myHolyBasilData collection. " + results);
            done(err, results);
        }
    );

}
exports.insertService = function (db,collectionName, data) {

    db.collection(collectionName).insertOne(data, function (err, result) {
        assert.equal(err, null);
        logger.log('verbose', " Inserted a document into the " + collectionName +" collection. " + JSON.stringify(data));

    });

}

exports.insertServiceCallback = function (db, tableName, data,callbck) {

    db.collection(tableName).insertOne(data, function (err, result) {
        assert.equal(err, null);
        logger.log('verbose', "Inserted a document into the" + tableName + " collection. " + JSON.stringify(data));
        callbck(err, result);
    });

}
exports.fetchLatest = function (db,done) {
    var collection = db.collection(collectionName);
    var cursor = collection.find().limit(1).sort({ $natural: -1 });
    
    cursor.toArray(function (err, results) {
        if (err) throw err;
        //console.log('%j', results);
        done(results);
    });
    
}

exports.updateService = function (db, collectionName, id,document, done) {
    var collection = db.collection(collectionName);

    collection.update({ "id": id }, document , function (err, response) {
        done(err, response);
        });
}

exports.fetchService = function (db,collectionName,id, done) {
    var collection = db.collection(collectionName);
   
    collection.findOne({ "id": id }, function (err, results) {
        done(err, results);
    })

}

exports.fetchAllService = function (db,fields, collectionName, done) {
    var collection = db.collection(collectionName);

    collection.find({}, fields).toArray(function (err, results) {
        done(err, results)
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
 


