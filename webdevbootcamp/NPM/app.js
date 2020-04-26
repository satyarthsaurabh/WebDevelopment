var express = require("express");
var app = express();

// HOME ROUTES
app.get("/", function(req, res){
		res.send("hello worls");
		});

// FRIEND ROUTES
app.get("/friend", function(req, res){
	res.render("friend.ejs");
});

// LISTEN
app.listen(3000, function(){
	console.log("the server has started");
});