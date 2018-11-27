let express = require('express');
let app = express();
let expressWs = require('express-ws')(app);
let TopicSubscriber = require('./TopicSubscriber');
let TopicPublisher = require('./TopicPublisher');
let solace = require('solclientjs').debug;
let path = require('path');
let XLSX = require('xlsx');

var factoryProps = new solace.SolclientFactoryProperties();
factoryProps.profile = solace.SolclientFactoryProperties.version10;
solace.SolclientFactory.init(factoryProps);

solace.SolclientFactory.setLogLevel(solace.LogLevel.WARN);

var subscriber;
let publisher = new TopicPublisher(solace, 'test/ws');
publisher.run();

process.on('SIGINT', function () {
    'use strict';
    subscriber.exit();
    publisher.exit();
});

app.set('port', 8080);

app.use('/', express.static(path.join(__dirname, './')));

app.ws('/test', (ws, req) => {
    function send(msg) { 
        subscriber.log('Received message: ' + msg.getBinaryAttachment() + 'at ' + Date.now() + '. Sent at ' + msg.getSenderTimestamp());
        
        var newString = msg.getSenderTimestamp() + '/' + Date.now() ;
        try { 
            ws.send(newString);
        } catch (e) {
            console.log("Error sending, WS closed.");
        }
    }

    subscriber = new TopicSubscriber(solace, 'test/ws', send);
    subscriber.run();
    subscriber.log('Press Ctrl-C to exit');
    process.stdin.resume();

    ws.on('message', function (msg) {   
        console.log(msg);
    });
});

app.ws('/send', (ws, req) => {
    ws.on('message', function (msg) {
        publisher.publish(msg);
    });
});

app.ws('/stats', (ws, req) => {
    ws.on('message', (msg) => {
        console.log(msg);

        let statsObj = JSON.parse(msg);
        let filename = statsObj.filename;
        let trialNumber = statsObj.trialNumber;

        let workbook = XLSX.readFile(path.join(__dirname, 'trials.xlsx'));
        let sheetName = workbook.SheetNames[0]; 
        let worksheet = workbook.Sheets[sheetName];
        let pubtoprox = statsObj.pubToProx;
        let proxToUI = statsObj.proxToUI;

        let output = [{ trial: trialNumber, missing: statsObj.missing, ...pubtoprox, ...proxToUI}];

        console.log(output);

        XLSX.utils.sheet_add_json(worksheet, output, { origin: -1, skipHeader: true });
                                                        
        XLSX.writeFile(workbook, path.join(__dirname, 'trials.xlsx'));
    });
});

app.listen(8080);
