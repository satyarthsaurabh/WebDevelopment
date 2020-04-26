// FRAMEWORK

var express = require("express");
var app = express();

// ROUTES
app.get("/", function(req, res){
	res.send("Hi there");
});

app.get("/bye", function(req, res){
	res.send("Good bye");
});

app.get("/dog", function(req, res){
	console.log("some one made a request on dog page");
	res.send("Meow");
});

app.get("/r/:subReddit", function(req, res){
	var subreddit = req.params.subReddit.toUpperCase();
	res.send("You are in the " + subreddit + " Page");
});

app.get("/r/:subReddit/comments/:id/:title", function(req, res){
	console.log(req.params);
	res.send("welcome to the comments page");
});

app.get("*", function(req, res){
	res.send("You are a star");
});

// Listen
// app.listen(process.env.PORT, process.env.IP, function(){
// 	console.log("Server has started");
// });
app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});


