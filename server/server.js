var app = require('express')(),
	server = require('http').createServer(app),
	fs = require('fs'),
	ent = require('ent');

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket, pseudo){


});

server.listen(8080, "0.0.0.0");