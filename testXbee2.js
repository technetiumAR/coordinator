var util = require('util');
var SerialPort = require('serialport').SerialPort;
var xbee_api = require('xbee-api');
var prompt = require('prompt');

var C = xbee_api.constants;

var xbeeAPI = new xbee_api.XBeeAPI({
    api_mode: 1
});

var serialport = new SerialPort("/dev/ttyAMA0", {
    baudrate: 9600,
    parser: xbeeAPI.rawParser()
});

prompt.start();

getPrompt();

serialport.on('data', function (data) {
    console.log('data received: ' + data);
});

// All frames parsed by the XBee will be emitted here
xbeeAPI.on("frame_object", function (frame) {

        if(frame.type == 136){
          console.log(">>", frame);
          getPrompt();
        }
});


function onErr(err) {
  console.log(err);
  return 1;
}

function getPrompt () {
  prompt.get(['command'], function (err, result) {
    if (err) { return onErr(err); }
    console.log('Command-line input received:');
    console.log('  Command: ' + result.command);

    var frame_test =
    {
        type: 0x08,
        id: 0x52,
        command: result.command,
        commandParameter: [],
    }

    serialport.write(xbeeAPI.buildFrame(frame_test));
    console.log('Sent to serial port.');

  });

}
