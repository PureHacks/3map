var express = require('express');
http = require('http');
var phantom = require('node-phantom');

var app = express();
app.set('port', 3000);
var server = http.createServer(app);
var io = require('socket.io').listen(server, {log: false });

server.listen(3000);

app.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function(socket){
	
	socket.emit('hello', { connected: 'yes' });

	socket.on('drag stopped', function (data) {
		console.log(data);
		socket.broadcast.emit('drag stopped', data);
	});
	
	socket.on('resize stopped', function (data) {
		console.log(data);
		socket.broadcast.emit('resize stopped', data);
	});
	
	socket.on('region created', function (data){
		console.log(data);
		socket.broadcast.emit('region created', data);
	});

	socket.on('region deleted', function (data){
		console.log(data);
		socket.broadcast.emit('region deleted', data);
	});
});

phantom.create(function(err, ph){
	return ph.createPage(function(err, page){
		return page.open("http://google.com", function(err, status){
			console.log("opened page: " + status);
			return page.render('public/img/frames/google.png');
			ph.exit();
		});
	});
});