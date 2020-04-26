var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var seedDB = require("./seed");



seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser:true, useUnifiedTopology: true });

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// =================
// CAMPGROUND ROUTES
// =================
// LANDING  ROUTE
app.get("/", function(req, res){
	res.render("landing");
});

// INDEX ROUTE - show all the campground 
app.get("/campgrounds", function(req, res){
// 	get all the campground from the database
	Campground.find({}, function(err, allcampground){
		if(err){
			console.log(err);
		} else {
			res.render("index", {campgrounds : allcampground});
		}
	});
});


app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newcampground = {name : name, image : image, description : description};
	Campground.create(newcampground, function(err, newlycreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	})
});

// NEW ROUTE - add a new campground to the index page
app.get("/campgrounds/new", function(req, res){
// 	make a new page for New form
	res.render("new");
});

// SHOW ROUTES- show more info about one route
app.get("/campgrounds/:id", function(req, res){
// 	find the campground with provided id
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundcampground){
		if(err){
			console.log(err);
		} else {
			// console.log(foundcampground)
			// 	render show template with that id
			res.render("show", {campground : foundcampground});
		}
	});
});

// ===============
// COMMENTS ROUTES
// ===============

app.get("/campgrounds/:id/comments/new",function(req, res){
	Campground.findById(req.params.id, function(err, foundcampground){
		if(err){
			console.log(err)
		} else {
			res.render("commNew", {campground : foundcampground});
		}
	})
	
})

app.post("/campgrounds/:id/comments", function(req, res){
	// Lookup campground using ID
	// create new comment
	// connect new comment
	Campground.findById(req.params.id,function(err, campground){
		if(err){console.log(err)}
		else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){console.log(err)}
				else {
					campground.comments.push(comment);
					campground.save();
					// console.log(comment);
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});


app.get("*", function(req, res){
	res.send("sorry you are opting for wrong page");
});
	

app.listen(3000, function(req, res){
	console.log("V2 server has started");
});
	
