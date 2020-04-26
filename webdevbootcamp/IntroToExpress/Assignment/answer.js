// FRAMEWORK
var express = require("express");
var ans = express();

// ROUTES

ans.get("/", function(req, res){
	res.send("Hi therer welcome to my assignment");
});

ans.get("/speak/:animal", function(req, res){
	var animal = req.params.animal.toLowerCase();
	var sounds = {
		cow : "moo",
		dog : "woof",
		pig : "oink"
	}
	var sound = sounds[animal];
	
	res.send("The " + animal + " says  " + sound);
});
ans.get("/repeat/:title/:num", function(req, res){
	var title = req.params.title;
	var num = Number(req.params.num);
	var result = "";
	for(var i=0; i < num; i++){
		result += title + " ";
	};
	res.send(result);
	
});
ans.get("*", function(req, res){
	res.send("sorry page not found");
})

// LISTEN ROUTES
ans.listen(3000, function(){
	console.log("Servar listing to port 3000");
})