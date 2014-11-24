var app = require('express')(), // Masse import
	server = require('http').createServer(app),
	path = require('path'),
	fs = require('fs');

app.get('/', function (req, res) { // Quand tu tapes localhost:8080/ il te renvoie index.html qui est situé dans le dossier client
	res.sendFile('index.html', { root: path.join(__dirname, '../client') });
});

var io = require('socket.io'); // On defini le websocket
var socket = io.listen(server);


socket.on('connection', function (client) { // Chaque client a une valeur de client.id differente 

	client.on('pseudo', function (pseudo) { // Quand il reçoit un pseudo il le renvoit à tout le monde (broadcast)
		console.log( pseudo + ' logged in'); // Log dans l'invite de commande
		client.broadcast.emit('newConnection', pseudo);
	});
	client.on('message', function (data) { // idem
		client.broadcast.emit('message', {"pseudo": data.pseudo, "message": data.message});
		socket.emit('message', {"pseudo": data.pseudo, "message": data.message});
		console.log(data.pseudo + ' : ' + returnStr(data.message));
	});
});

function returnStr (inputStr) { // Permet au serveur d'afficher la chaine codée sans virgule entre les caractères (parceque c'est un tableau)
	var outputStr = '';
	for (i = 0; i < inputStr.length; i++) {
		outputStr = outputStr + inputStr[i];
	}
	return outputStr;
}

server.listen(8080, "0.0.0.0"); // Definie l'URL du serveur 