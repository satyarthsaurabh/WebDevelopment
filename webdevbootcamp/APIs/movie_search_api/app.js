var express = require('express');
var app = express();
var request = require('request');

app.use(express.static("public"));

app.set("view engine", "ejs");

// HOME ROUTES
app.get("/", function(req, res){
	res.render("search");
});

// GET ROUTES FOR RESULTS
app.get("/results", function(req, res){
	var query = req.query.search;
	var url = 'http://www.omdbapi.com/?s=' + query + '&apikey=thewdb';
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			var parsedData = JSON.parse(body);
			// res.send(parsedData["Search"][0]);
			res.render("results", {data : parsedData});
		}
	})
	// 
});

// SERVER IS LISTENING TO PORT 3000
app.listen(3000, function(){
	console.log("movie server has started");
});