var winston = require('winston');
winston.handleExceptions(new winston.transports.Console());

var getDom = require('../index');
var http = require('http');

exports.testTimeout = function(test){
	var server = http.createServer(function(request, response){
		response.on('close', function(){
			console.log("Client has terminated connection");
		});
	});
	server.timeout = 0;
	server.listen(12523);
	getDom({
		url:'http://localhost:12523',
		timeout: 1000,
	}).then(function(){
		console.log("Got success");
	}).catch(function(err){
		console.log("Got error", err);
	}).finally(function(){
		server.close();
		test.done();
	});
};