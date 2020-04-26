var mongoose = require('mongoose');
// var Post = require('./models/post');
// var User = require('./models/user');

// mongoose.connect("mongodb://localhost/blog_demo_2");
mongoose.connect("mongodb://localhost:27017/blog_demo_2", {useNewUrlParser:true, useUnifiedTopology: true });

var Post = require('./models/post.js');
var User = require('./models/user.js');




// User.create({
// 	email : 'hardeep@edgistify.com',
// 	name : 'Hardeep Chema'
// })

Post.create({
	title : 'What is a machine',
	content : "Any structure is not a machine "
},function(err, post){
	User.findOne({email:'hardeep@edgistify.com'}, function(err, foundUser){
		if(err){ console.log(err)}
		else {
			foundUser.posts.push(post);
			foundUser.save(function(err, data){
				if(err){console.log(err)}
				else {
					console.log(data);
				}
			})
			
		}
	})
});

// User.findOne({email :'hardeep@edgistify.com'}).populate('posts').exec(function(err, user){
// 	if(err){
// 	console.log(err)
// 	}
// 	else {
// 	console.log(user);
// 	}
// });








