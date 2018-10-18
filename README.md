# ws-solace
An example to demonstrate using an express/websocket server as a proxy for solace messages to be delivered to a UI.

clone repo

npm install

node app.js

navigate to the index.html file in your browser and click connect

The server will then start listening to solace messages, and when they come in they will be forwarded to the UI via the established websocket connection
