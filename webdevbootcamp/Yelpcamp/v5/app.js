var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var seedDB = require("./seed");
var methodOverride = require("method-override");

// requiring routes
var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds");

// seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser:true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', true);
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(campgroundRoutes);
app.use(commentRoutes);





app.get("*", function(req, res){
	res.send("sorry you are opting for wrong page");
});
	

app.listen(3000, function(req, res){
	console.log("V2 server has started");
});
	
