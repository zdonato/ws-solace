var runTimes = []
function connect() {
    console.log("Connecting to ws...");
    const socket = new WebSocket('ws://localhost:8080/test');
    runTimes = [];
    socket.addEventListener('open', (evt) => {
        console.log("Connected");
        //socket.send("Hello World!");
    });

    socket.addEventListener('message', (evt) => {
        var now = Date.now(),
            times = evt.data.split('/'),
            pubProxTime = parseInt(times[1]) - parseInt(times[0]),
            proxUITime = parseInt(now) - parseInt(times[1]),
            runtime = pubProxTime + '/' + proxUITime;

        console.log('Time: ' + runtime);
        runTimes.push(runtime);
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
    }, 10)

    setTimeout(function(){
        clearInterval(interval)
    }, 10000);
}

function analyzeRuntime (){
    function TimeRow(number, pubToProx, proxToUI){
        this.MessageNum = 'Message ' + number;
        this.PubToProx = parseInt(pubToProx);
        this.ProxToUI = parseInt(proxToUI);
    }

    var parsedTimes = runTimes.map((item, index)=> {
        var timeArray = item.split('/');
        return new TimeRow(index + 1, timeArray[0], timeArray[1]);
    });
    
    console.table(parsedTimes);
}