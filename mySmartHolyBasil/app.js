'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users'); 

var mqtt = require('mqtt');

var ip = require("ip");

const ipAddress = ip.address();

const winston = require('winston');
//winston.level =  'debug';

var fs = require('fs');
var dir = './log';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: __dirname+'/log/logF.log' })
    ]
});
logger.level = 'debug';

const assert = require('assert');
const uuid = require('uuid');
const uid = uuid.v1();



var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//console.log("server started");

//MQTT Client
var mqttBrokerUrl = "tcp://iot.eclipse.org:1883";


var mqttConnectOptions = {
    keepalive: 20,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    connectTimeout: 30 * 1000
};
   

var subTopic = "myHolyBasil/moisture";
var moisture, temperature, humidity, timestamp = 0;


var mqttClient = mqtt.connect(mqttBrokerUrl, mqttConnectOptions);

mqttClient.on('connect', function () {
    logger.log('info', uid+" Connected to MQTT Broker : " + mqttBrokerUrl);
    
    mqttClient.subscribe(subTopic, function () {
        logger.log('info', uid +" Subscribed to MQTT Topic : " + subTopic);
    });
    
});

mqttClient.on('reconnect', function () {

    logger.log('debug', uid + " Trying to reconnected to MQTT Broker : " + mqttBrokerUrl);
}); 

mqttClient.on('error', function () {

    logger.log('error', uid +" Cannot connect to MQTT Broker : " + mqttBrokerUrl);
});

mqttClient.on('message', function (topic, message) {
    // message is Buffer 
    var data = message.toString();
    //console.log("data received from Basil Plant : " + data );
    var array = data.split(',');

    moisture = parseFloat(array[0]);
    temperature = array[1];
    humidity = array[2];
    timestamp = new Date();
    var deserilizedData = "Status at " + timestamp + ": Moisture : " + moisture + " %,  Temperature : " + temperature + " C, " + " Humidity : " + humidity + ' %';
    logger.log('verbose', uid +" "+deserilizedData);


});



mqttClient.on('close', function () {
        
    logger.log('debug', uid +" MQTT Connection closed");
}); 

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = app.listen(3000, function () {
    //console.log("Calling app.listen's callback function.");
    var host = server.address().address;
    var port = server.address().port;
    logger.log('debug', uid +" Connected Things App started & listening at"+ ipAddress+":"+ port);
});
//module.exports = app;
