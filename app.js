/* Server Setting*/
// var config = require(__dirname + '/../config.js');
var express = require('express');
var socketioJwt = require('socketio-jwt');
var events = require('events');
var http = require ('http').Server(app)

var io = require ('socket.io')(http)


var app = new express();
var emitter = new events.EventEmitter();
// var morgan = require ('morgan');

var config = require(__base+ '/config/environtment/config');

var env = process.env.NODE_ENV || "development";





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

