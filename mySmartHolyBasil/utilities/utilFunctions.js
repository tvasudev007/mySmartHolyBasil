
var constants = require('.././constants');

//logs
const winston = require('winston');

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


exports.rescale =  function (val, inMin, inMax, outMin, outMax) {

    return (val - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;

}