var mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost/blog_demo");
mongoose.connect("mongodb://localhost:27017/blog_demo", {useNewUrlParser:true, useUnifiedTopology: true });

// post - title, content
// POST SCHEMA
var postSchema = new mongoose.Schema({
	title : String,
	content : String
});
// POST MODEL
var Post = mongoose.model("Post", postSchema);


//  USER - email, name
// USER SCHEMA
var userSchema = new mongoose.Schema({
	email : String,
	name : String,
	posts : [postSchema]
});
// USER MODEL
var User = mongoose.model("User", userSchema);


// var newUser = new User({
// 	email : "harrypotter@hogwarts.com",
// 	name : "Harry Potter"
// });

// newUser.posts.push({
// 	title : "Magic can happen",
// 	content : "Magic only happens in the hogwarts"
// });

// newUser.save(function(err, user){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(user);
// 	}
// });

// FINDING THE DATA BY findOne METHOD
User.findOne({name: 'Harry Potter'}, function(err, user){
	if(err){
		console.log(err);
	} else {
		user.posts.push({
			title : "3 things I really hate",
			content : "Voldemart, Voldemart, Voldemart"
		});
		user.save(function(err, user){
		if(err){
			console.log(err);
		} else {
			console.log(user);
		}
		});
	}
});

// Post.create({
// 	title : "How to spell a magic",
// 	content : "Magic only happens in the hogwarts"
// }, function(err, post){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log(post);
// 	}))





