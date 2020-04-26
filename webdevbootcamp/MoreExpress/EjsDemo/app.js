
var express = require("express");
var app = express();

app.use(express.static("public"));
// app.set("view-engine", "ejs");

// /ROUTES
app.get("/", function(req, res){
	res.render("home.ejs");
});

app.get("/fellinlove/:thing", function(req, res){
	var thing = req.params.thing;
	res.render("love.ejs", {thingVar : thing});
	// res.send("You fell in love with " + thing);
});

app.get("/posts", function(req, res){
	var posts = [
		{title : "Post 1", author : "J.k. Rowling"},
		{title : "Post 2", author : "William Worthworth"},
		{title : "Post 3", author : "William Shakespere"},
		{title : "Post 4", author : "Robert Frost"}
	];
	res.render("post.ejs", {post : posts});
})


app.get("*", function(req, res){
	res.send("Sorry you are in the wrong page");
});

// LISTEN PORT
app.listen(3000, function(){
console.log("Server has started");
});