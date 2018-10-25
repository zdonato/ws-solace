let express = require('express');
let app = express();
let expressWs = require('express-ws')(app);
let TopicSubscriber = require('./TopicSubscriber');
let TopicPublisher = require('./TopicPublisher');
let solace = require('solclientjs').debug;
let path = require('path');

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
        
        try { 
            ws.send(msg.getBinaryAttachment());
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

app.listen(8080);
