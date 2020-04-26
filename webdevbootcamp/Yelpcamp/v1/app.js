var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser:true, useUnifiedTopology: true });

// Schema
var campgroundSchema = new mongoose.Schema({
	name : String,
	image : String,
	description : String
});

// model
var Campground = mongoose.model("Campground", campgroundSchema);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}))


// Campground.create({
// 	name : "Yelpcamp 1",
// 	image : "https://images.pexels.com/photos/344102/pexels-photo-344102.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
// 	description : "First description of the image is the description of the image"
// }, function(err, campground){
// 	if(err){
// 		console.log("Something went wrong");
// 		console.log(err);
// 	} else {
// 		console.log("your campground has been added");
// 		console.log(campground);
// 	}
// });
// var campgrounds = [
// 		{name : "yelpcamp 1", image : "https://images.pexels.com/photos/344102/pexels-photo-344102.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
// 		{name : "yelpcamp 2", image : "https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
// 		{name : "yelpcamp 3", image : "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"},
// 	];

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
// 	get all campground from the DB
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("index", {campgrounds : allCampgrounds});
		}
	});
});

app.post("/campgrounds", function(req, res){
// 	get data from form and add to camp array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = {name: name, image: image, description : description};
	// campgrounds.push(newCampground);
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
			console.log("SOMETHING WENT WRONG");
		} else {
			// 	redirect back to campground page
			res.redirect("/campgrounds");
		}
	});
});

app.get("/campgrounds/new", function(req, res){
// 	make a new page for form
	res.render("new");
});



app.listen(3000, function(){
	console.log("Yelpcamp server has started");
});