// FRAMEWORK
var express = require('express');
var index = express();

// ROUTES
index.get("/", function(req, res){
	res.send("Hi there welcome to my assignment");
});

index.get("/speak/:animal", function(req, res){
	var sounds = {
		cow : "maa",
		dog : "woof",
		cat : "meow"
	};
	var animal = req.params.animal;
	res.send("The " + animal + " sounds like " + sounds[animal]);
});

index.get("/repeat/:word/:num", function(req, res){
	var word = req.params.word;
	var num = req.params.num;
	var result = "";
	for(var i=0; i < Number(num); i++){
		result += word + " ";
	}
	res.send(result);
});

index.get("*", function(req, res){
	res.send("Sorry this is the wrong page");
});

index.listen(3000, function(req, res){
	console.log("Server has started");
});