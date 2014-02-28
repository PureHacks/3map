var express = require('express');
var phantom = require('node-phantom');

var app = express();

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000);

phantom.create(function(err, ph){
	return ph.createPage(function(err, page){
		return page.open("http://google.com", function(err, status){
			console.log("opened page: " + status);
			return page.render('public/img/frames/google.png');
			ph.exit();
		});
	});
});