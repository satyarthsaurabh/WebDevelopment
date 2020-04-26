var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
// ===============
// COMMENTS ROUTES
// ===============

router.get("/campgrounds/:id/comments/new",function(req, res){
	Campground.findById(req.params.id, function(err, foundcampground){
		if(err){
			console.log(err)
		} else {
			res.render("commNew", {campground : foundcampground});
		}
	})
	
})

router.post("/campgrounds/:id/comments", function(req, res){
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

// COMMENT EDIT
router.get("/campgrounds/:id/comments/:comment_id/edit", function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundcomment){
		if(err){console.log(err);}
		else {
			res.render("commEdit", {campground_id : req.params.id, comment : foundcomment});	
		}
	});
});

// COMMENT UPDATE
router.put("/campgrounds/:id/comments/:comment_id", function(req, res){
		console.log(req.params.comment_id);
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatecomment){
		// console.log(req.body.comment);
		if(err){
			console.log(err);
			// res.redirect("back");
		} else {
			console.log(req.body.comment);
			console.log(updatecomment);
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});
	
// DESTROY COMMENT
router.delete("/campgrounds/:id/comments/:comment_id", function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("/campgrounds/" + req.params.id);
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});



module.exports = router;
