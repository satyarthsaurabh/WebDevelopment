var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");



// =================
// CAMPGROUND ROUTES
// =================
// LANDING  ROUTE
router.get("/", function(req, res){
	res.render("landing");
});

// INDEX ROUTE - show all the campground 
router.get("/campgrounds", function(req, res){
// 	get all the campground from the database
	Campground.find({}, function(err, allcampground){
		if(err){
			console.log(err);
		} else {
			res.render("index", {campgrounds : allcampground});
		}
	});
});


router.post("/campgrounds", function(req, res){
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
router.get("/campgrounds/new", function(req, res){
// 	make a new page for New form
	res.render("new");
});

// SHOW ROUTES- show more info about one route
router.get("/campgrounds/:id", function(req, res){
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

// EDIT ROUTES
router.get("/campgrounds/:id/edit", function(req, res){
	Campground.findById(req.params.id, function(err, foundcampground){
		if(err){console.log(err);}
		else {
			res.render("edit", { campground : foundcampground});
		}
	});
});

// UPDATE ROUTES
router.put("/campgrounds/:id", function(req, res){
	Campground.findOneAndUpdate(req.params.id, req.body.campground, function(err, updateCampground){
		if(err){console.log(err); res.redirect("/campgrounds");}
		else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DELETE ROUTES
router.delete("/campgrounds/:id", function(req, res){
	Campground.findOneAndDelete(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;