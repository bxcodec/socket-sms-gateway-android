/* Databse Setting*/
var mysql = require('mysql');
var config = require('./config').database;

var env = process.env.NODE_ENV || "development";
var params = {
	host : config[env].host,
	database : config[env].database,
	user: config[env].username,
	password: config[env].password,
	port: config[env].port,
	connectionLimit: 65535
};

exports.mysqlPool = mysql.createPool(params);


