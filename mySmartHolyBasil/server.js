
var db = require('./db/dbHandler');

var mqtt = require('mqtt');


var EventEmitter = require("events").EventEmitter;
global.calibrateEvent = new EventEmitter();

var app = require('./app');


var constants = require('./constants');

var ip = require("ip");

var util = require('./utilities/utilFunctions');

var alertSender = require('./alerts/alertsSender');

const ipAddress = ip.address();

//logs
const winston = require('winston');
//winston.level =  'debug';

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: constants.logDirPath + 'server.log' })
    ]
});


logger.level = 'debug';

const assert = require('assert');
const uuid = require('uuid');
const uid = uuid.v1();

//MQTT Client
var mqttBrokerUrl = constants.mqttURL;

//db connection
var dbObj = null;



var mqttConnectOptions = {
    keepalive: 20,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    connectTimeout: 30 * 1000
};


var subTopic = constants.subTopic;
global.moisture = 0;
global.temperature = 0;
global.humidity = 0
var timestamp = 0;

var prevMoisture = 0;
var prevHumidity = 0;
var prevTemperature = 0;

global.minVal = 10;
global.maxVal = 55;

global.warnThreshold = 50;
global.criThreshold = 30;

global.variance = 5;


 

var mqttClient = mqtt.connect(mqttBrokerUrl, mqttConnectOptions);

mqttClient.on('connect', function () {
    logger.log('info', uid + " Connected to MQTT Broker : " + mqttBrokerUrl);
    // Connect to Mongo on start
    db.connect(constants.dbURL, function (err) {

        assert.equal(err, null);
        logger.log('info', uid + " Connected to MongoDB : " + constants.dbURL);

    })
    mqttClient.subscribe(subTopic, function () {
        logger.log('info', uid + " Subscribed to MQTT Topic : " + subTopic);
    });

});

mqttClient.on('reconnect', function () {

    logger.log('debug', uid + " Trying to reconnected to MQTT Broker : " + mqttBrokerUrl);
});

mqttClient.on('error', function () {

    logger.log('error', uid + " Cannot connect to MQTT Broker : " + mqttBrokerUrl);
});

mqttClient.on('message', function (topic, message) {
    
    var data = message.toString();  // message is Buffer 
    
    var array = data.split(',');

    moisture = parseFloat(array[0]);
    temperature = parseFloat(array[1]);
    humidity = parseFloat(array[2]);
    timestamp = new Date();
    millis = new Date().getTime();
    moisture = Math.round(util.rescale(moisture, minVal, maxVal, 0, 100));
    db.insertService(db.get(), "networkLog", { timestamp: millis });
    var deserilizedData = "Status at " + timestamp + ": Moisture : " + moisture + " %,  Temperature : " + temperature + " C, " + " Humidity : " + humidity + ' %';
    if (moisture < warnThreshold){
        calibrateEvent.emit("warning", moisture);
    }
    else if (moisture < criThreshold) {
        console.log("critical");
        calibrateEvent.emit("critical", moisture);
    }
    
    var sensorData = {
        "moisture": moisture, "temperature": temperature, "humidity": humidity, "timestamp": timestamp, "_id": millis
    }
    logger.log('verbose', uid + " " + JSON.stringify(sensorData));
    //console.log("sensorData.moisture : " + sensorData.moisture + " prevMoisture : " + prevMoisture);
    if (sensorData.moisture - prevMoisture > variance || prevMoisture - sensorData.moisture > variance || sensorData.temperature - prevTemperature > 2 || sensorData.temperature - prevTemperature < - 2 || sensorData.humidity - prevHumidity > 5 || sensorData.humidity - prevHumidity < - 5) {
        db.insert(db.get(), sensorData); 
    }
    else {
        logger.log('debug', uid + "  Applied compression on Sensor data  ");
    }

    prevMoisture = sensorData.moisture;
    prevTemperature = sensorData.temperature;
    prevHumidity = sensorData.humidity;
       


});



mqttClient.on('close', function () {

    logger.log('debug', uid + " MQTT Connection closed");
}); 


calibrateEvent.on("calibrate", function (id) {
    //console.log("EVENT " +id);
    db.fetchService(db.get(), "assetCollection", id, function (err, response) {
        global.minVal = response.calibration.low;
        global.maxVal = response.calibration.high;
        global.variance = response.variance;
        global.warnThreshold = response.warningThreshold;
        global.criThreshold = response.criticaThreshold;
    })
});


var server = app.listen(3000, function () {
    //console.log("Calling app.listen's callback function.");
    var host = server.address().address;
    var port = server.address().port;
    logger.log('debug', uid + " Connected Things App started & listening at" + ipAddress + ":" + port);
}); 