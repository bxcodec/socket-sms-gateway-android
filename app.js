
var express = require('express'),
	socketioJwt = require('socketio-jwt'),
	events = require('events'),
	http = require ('http').Server(app),
	io = require ('socket.io')(http),
	app = new express(),
	emitter = new events.EventEmitter(),
	config = require(__base+ '/config/environtment/config'),
	env = process.env.NODE_ENV || "development";

app.get('/', function (req,res) {
	res.sendFile(__base+"/index.html");
});

io.set('authorization', socketioJwt.authorize({
  secret: "secretuser",
  handshake: true
}));

var driver = io.of('/phone');

driver.on ('connection' , function(socket) {	

	var decoded_token = socket.client.request.decoded_token;
	console.log(decoded_token.data.phone_number, 'connected');

	
	socket.on('incoming_sms', function(data){
		socket.emit("incoming_sms_notif")
	});

	socket.on('send_sms', function (data) {
		socket.emit("send_sms_to_phone")
	});

	socket.on('disconnect', function() {
		console.log(decoded_token.data.phone_number+ " disconnected from Server");
	});


});

exports.Server= http;

