
var express = require('express'),
	socketioJwt = require('socketio-jwt'),
	events = require('events'),
	
	app = new express(),
	emitter = new events.EventEmitter(),
	config = require(__base+ '/config/environtment/config'),
	env = process.env.NODE_ENV || "development";
	var bodyParser = require('body-parser')
 
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({extended: false}))

app.get('/', function (req,res) {
	res.sendFile(__base+"/index.html");
});

app.post("/sms",function (req,res) {



	var phone_number = req.body.phone_number ||"";
	var message = req.body.message ||"";


	if (phone_number=="" || message==""){
		res.status(400).json({message:"Bad Request Missing Required Params"});
	}


	var SMS = {
		phone_number:phone_number,
		message:message,
		sent:false
	};

	emitter.emit("send_sms_to_phone", {SMS});

	res.status(200).json({message:"Your SMS will delivered "});

});

http = require ('http').Server(app);
io = require ('socket.io').listen(http);
var driver = io.of('/phone');



driver.on ('connection' , function(socket) {	

	// socket.emit("ready", {data:"Ready"});
	// var decoded_token = socket.client.request.decoded_token;
	console.log( JSON.stringify(socket.id)+ 'connected');

	
	socket.on('incoming_sms', function(data){
		console.log(data);
		emitter.emit("incoming_sms_notif",{data:data});
	});

	emitter.on("incoming_sms_notif", function (data) {
		// body...
		socket.emit("incoming_sms_notif",data);
	})

	// socket.on('send_sms', function (data) {
		
	// 	console.log(data);
	// 	emitter.emit("send_sms_to_phone", {data:data});
	// });

	socket.on("success_delivered_sms", function(data){
		console.log("Success Mammen");
		console.log(data);

	});

	emitter.on("send_sms_to_phone", function (data) {
		// body...
		socket.emit("send_sms_to_phone",data);
	})

	socket.on('disconnect', function() {
		console.log(socket.id+ " disconnected from Server");
	});


});

exports.Server= http;

