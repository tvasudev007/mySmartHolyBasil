
const sensorDBURI = "mongodb://myConnectedDB:myConnectedDBpass@myconnectedholybasil-shard-00-00-3tbdy.mongodb.net:27017/holyBasilData?ssl=true&replicaSet=myConnectedHolyBasil-shard-0&authSource=admin";

const logDirectoryPath = __dirname + '/log/';

const mqttBrokerURL = "tcp://iot.eclipse.org:1883";
const subscribptionTopic = "myHolyBasil/moisture";

const accountSid = 'AC648d6e480e556571b1203dc06e6875ac'; // Your Account SID from www.twilio.com/console
const authToken = 'e925cbe022799c01dc9709c200a819bd';   // Your Auth Token from www.twilio.com/console
const twilioOperatorNumber = "+13343393143";      //Twilio valid number

const operatorEmailId = "myconnectedthings007@gmail.com";
const operatorPassword = "tvasudev007";




Object.defineProperty(exports, "dbURL", {
    value: sensorDBURI,
    enumerable: true,
    writable: false,
    configurable: false
});

Object.defineProperty(exports, "logDirPath", {
    value: logDirectoryPath,
    enumerable: true,
    writable: false,
    configurable: false
});

Object.defineProperty(exports, "mqttURL", {
    value: mqttBrokerURL,
    enumerable: true,
    writable: false,
    configurable: false
});

Object.defineProperty(exports, "subTopic", {
    value: subscribptionTopic,
    enumerable: true,
    writable: false,
    configurable: false
});

Object.defineProperty(exports, "accountSid", {
    value: accountSid,
    enumerable: true,
    writable: false,
    configurable: false
});

Object.defineProperty(exports, "authToken", {
    value: authToken,
    enumerable: true,
    writable: false,
    configurable: false
});

Object.defineProperty(exports, "operatorNumber", {
    value: twilioOperatorNumber,
    enumerable: true,
    writable: false,
    configurable: false
});

Object.defineProperty(exports, "operatorEmailId", {
    value: operatorEmailId,
    enumerable: true,
    writable: false,
    configurable: false
});

Object.defineProperty(exports, "operatorPassword", {
    value: operatorPassword,
    enumerable: true,
    writable: false,
    configurable: false
});