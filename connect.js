var runTimes = []
var trialNumber = 1;
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

        //console.log('Time: ' + runtime);
        runTimes.push(runtime);
    });
}

const sendSock = new WebSocket('ws://localhost:8080/send');
const statsSock = new WebSocket('ws://localhost:8080/stats');

sendSock.addEventListener('open', (evt) => {
    console.log('Send socket opened');
});

function send() {
    var interval,
        i = 0;
    // for (var i = 0; i < 1000; i++) {
    //     sendSock.send('Hello World!' + ' #' + (i+1) + ' ');
    //     sleep(.01);
    // }
    interval = setInterval(function(){
        i++;
        sendSock.send('Hello World!' + ' #' + i + ' ');
        console.log('Sent message ' + 'Hello World!' + ' #' + i )
    }, 25)

    setTimeout(function(){
        i = 0;
        clearInterval(interval)
    }, 250);
}

function sleep(seconds) {
  var e = new Date().getTime() + (seconds * 1000);
  while (new Date().getTime() <= e) {}
}

function analyzeRuntime (){
    var pubToProxArray = [],
        proxToUIArray = [],
        meanpubToProx,
        meanproxToUI,
        medianpubtoProx,
        medianproxToUI,
        modepubtoProx,
        modeproxToUI,
        maxpubtoProx,
        maxproxToUI,
        minpubtoProx,
        minproxToUI,
        stdevpubtoProx,
        stdevproxToUI;

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

    parsedTimes.forEach((item) => {
        pubToProxArray.push(item.PubToProx);
        proxToUIArray.push(item.ProxToUI);
    });

    meanpubToProx = math.mean(...pubToProxArray);
    medianpubtoProx = math.median(...pubToProxArray);
    modepubtoProx = math.mode(...pubToProxArray);
    maxpubtoProx = math.max(...pubToProxArray);
    minpubtoProx = math.min(...pubToProxArray);
    stdevpubtoProx = math.std(...pubToProxArray);

    console.log(`Statistical analyses Solace --> Proxy (ms) - Mean: ${meanpubToProx}, Median: ${medianpubtoProx}, Mode: ${modepubtoProx}, Max: ${maxpubtoProx}, Min: ${minpubtoProx}, STDev: ${stdevpubtoProx}`);

    meanproxToUI = math.mean(...proxToUIArray);
    medianproxToUI = math.median(...proxToUIArray);
    modeproxToUI = math.mode(...proxToUIArray);
    maxproxToUI = math.max(...proxToUIArray);
    minproxToUI = math.min(...proxToUIArray);
    stdevproxToUI = math.std(...proxToUIArray);

    console.log(`Statistical analyses Proxy --> UI (ms) - Mean: ${meanproxToUI}, Median: ${medianproxToUI}, Mode: ${modeproxToUI}, Max: ${maxproxToUI}, Min: ${minproxToUI}, STDev: ${stdevproxToUI}`);

    let statsObj = {
        missing: (1000 - parsedTimes.length),
        trialNumber,
        pubToProx: {
            meanPub: meanpubToProx,
            medianPub: medianpubtoProx,
            modePub: modepubtoProx[0],
            maxPub: maxpubtoProx,
            minPub: minpubtoProx,
            stddevPub: stdevpubtoProx
        },
        proxToUI: {
            meanProx: meanproxToUI,
            medianProx: medianproxToUI,
            modeProx: modeproxToUI[0],
            maxProx: maxproxToUI,
            minProx: minproxToUI,
            stddevProx: stdevproxToUI
        }
    };

    statsSock.send(JSON.stringify(statsObj));

    runTimes = [];
    trialNumber++;
}