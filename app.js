var osc = require('osc-min');
var udp = require('dgram');


var oscInPort = 23456;
console.log ("OSC listener running at http://localhost: " + oscInPort);

//creat socket and listen for incoming messages
sock = udp.createSocket("udp4", function(msg, rinfo) {
    var error, error1, message;

    //get the sender's IP address
    var senderAddress = rinfo.address;
    
    //copy the message from the osc buffer
    var message= osc.fromBuffer(msg);

    //get the protocol address
    var oscAddress = message.address;

    //print out the sender address and the osc protocol address
    console.log("**************************************************");
    console.log("message received from ip " + senderAddress + " with address " + oscAddress);

    //if there are arguments, list them one by one.
    if(message.args.length > 0){
    	console.log("arguments: ");
    	for(var i = 0; i < message.args.length; i++){
    		console.log(message.args[i].value);
	    }
    } else {
    	console.log("no arguments");
    }
});

//bind your listener to the specified port
sock.bind(oscInPort);