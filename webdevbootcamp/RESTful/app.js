var express = require("express"),
	app = express();
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	expressSanitizer = require("express-sanitizer"),
	mongoose = require("mongoose");
	

// APP CONFIG
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useNewUrlParser:true, useUnifiedTopology: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// MONGOOSE/ MODEL CONFIG
var blogSchema = new mongoose.Schema({
	title : String,
	image : String,
	body : String,
	created : {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
// 	title : "the blog",
// 	image : "https://images.unsplash.com/photo-1586779161657-041097557546?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
// 	body : "ldfalhfasjdfasjflasjf"
// });

// RESTFUL ROUTES
app.get("/", function(req, res){
	res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log(err);
		} else {
			res.render("index", {blogs : blogs});
		}
	})
	
});
app.get("/blogs/new", function(req, res){
// 	add a new blog
	res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res){
	var title = req.body.title;
	var image = req.body.image;
	// console.log(req.body.body)
	var body = req.sanitize(req.body.body);
	// console.log("=========");
	// console.log(req.body.body);
	var created = req.body.created;
	var newblogs = {title : title, image : image, body : body, created : created}
	Blog.create(newblogs, function(err, newlyblog){
		if(err){ console.log(err);}
		else {
			res.redirect("/blogs");
		}
	});
});

// SHOW ROUTES
app.get("/blogs/:id", function(req, res){
	var id = req.params.id;
	Blog.findById(id, function(err, foundblog){
		if(err){ console.log(err);}
		else {
			res.render("show", {blog : foundblog});
		}
	});
});

// EDIT ROUTES
app.get("/blogs/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, foundblog){
		if(err){
			console.log(err); 
			res.redirect("/blogs")
		} else {
			res.render("edit", {blog : foundblog})
		}
	})
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findOneAndUpdate(req.params.id, req.body.blog, function(err, updatedblog){
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
	Blog.findOneAndDelete(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	})
});


app.get("*", function(req, res){
	res.send("Sorry this page is not available");
})
// SERVER IS LISTENSING 
app.listen(3000, function(){
	console.log("The server has started");
});