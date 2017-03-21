global.__base = __dirname+'/';

global.__logger = require('winston');

var app = require(__dirname + '/app.js');
 

global.__app = app.Server;

server = __app;
var port = process.env.PORT || 9292;


server.listen(port, function () {
	__logger.info('[SERVER] Listening on port ' + port);
});
