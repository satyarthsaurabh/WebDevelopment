var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser : true, useUnifiedTopology:true});

// built Schema
var catSchema = new mongoose.Schema({
	name : String,
	age : Number,
	breed : String
});

// built model
var Cat = mongoose.model("Cat", catSchema);

// INSERT THE DATA IN CAT COLLECTION 
Cat.create({
	name : "Tiger",
	age : 12,
	breed : "wonder Cat"
}, function(err, cat){
	if(err){
		console.log(err);
	} else {
		console.log(cat);
	}
});

// FIND THE DATA IN CAT COLLECTION
Cat.find({},  function(err, cats){
	if(err){
		console.log(err);
	} else {
		console.log("ALL THE CATS");
		console.log(cats);
	}
});



