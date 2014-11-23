var app = require('express')(),
	server = require('http').createServer(app),
	path = require('path'),
	fs = require('fs');

app.get('/', function (req, res) {
	res.sendFile('index.html', { root: path.join(__dirname, '../client') });
});

var io = require('socket.io');
var socket = io.listen(server);

socket.set("log level", 1);

socket.on('connection', function (client) {

	client.on('pseudo', function (pseudo) {
		console.log( pseudo + ' logged in');
		client.broadcast.emit('newConnection', pseudo);
	});
	client.on('message', function (data) {
		client.broadcast.emit('message', {"pseudo": data.pseudo, "message": data.message});
		socket.emit('message', {"pseudo": data.pseudo, "message": data.message});
		console.log(data.pseudo + ' : ' + returnStr(data.message));
	});
});

function returnStr (inputStr) {
	var outputStr = '';
	for (i = 0; i < inputStr.length; i++) {
		outputStr = outputStr + inputStr[i];
	}
	return outputStr;
}

server.listen(8080, "0.0.0.0");