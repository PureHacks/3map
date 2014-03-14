var express = require('express');
http = require('http');
var phantom = require('node-phantom');

var app = express();
app.set('port', 3000);
var server = http.createServer(app);
var io = require('socket.io').listen(server, {log: false });

var captureInterval = 4500; //ms
var initialCaptureDelay = 5000; //ms; gives PhantomJS time to finish loading page assets

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
	ph.createPage(function(err, page){
		page.viewportSize = {
			width: 864,
			height: 480
		};
		page.open("http://localhost:3000/clock.html", function(err, status){

			var captureScreengrab = function(page){
				page.render('public/img/frames/frame.png', function(err, status){
					console.log('rendered screengrab');
					io.sockets.emit('updated frame', {
						filename: "frame.png"
					});
				});
			}

			console.log("opened page: " + status);
			setTimeout(function(){
				setInterval(function(){
					captureScreengrab(page);
				}, captureInterval); // NB This is not tested with values < 1000ms
			}, initialCaptureDelay);
			//ph.exit();

			
		});
	});
});
