

const sensorDBURI = "mongodb://myConnectedDB:myConnectedDBpass@myconnectedholybasil-shard-00-00-3tbdy.mongodb.net:27017/holyBasilData?ssl=true&replicaSet=myConnectedHolyBasil-shard-0&authSource=admin";

const logDirectoryPath = __dirname + '/log/';

const mqttBrokerURL = "tcp://iot.eclipse.org:1883";


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