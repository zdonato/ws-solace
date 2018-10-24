function connect() {
    console.log("Connecting to ws...");
    const socket = new WebSocket('ws://localhost:8080/test');

    socket.addEventListener('open', (evt) => {
        console.log("Connected");
        //socket.send("Hello World!");
    });

    socket.addEventListener('message', (evt) => {
        console.log(evt.data + 'at' + Date.now());
    });
}

const sendSock = new WebSocket('ws://localhost:8080/send');

sendSock.addEventListener('open', (evt) => {
    console.log('Send socket opened');
});

function send() {
    var interval;

    interval = setInterval(function(){
        sendSock.send('Hello World!');
    }, 20)

    setTimeout(function(){
        clearInterval(interval)
    }, 600);
}