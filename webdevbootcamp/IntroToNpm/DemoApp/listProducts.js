// IMPORTING A "faker" NPM PACKAGE TO PRINT THE FAKE PRODUCT LIST 

var faker = require('faker');

// var randomName = faker.name.findName(); // Rowan Nikolaus
// var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
// var randomCard = faker.helpers.createCard(); // random contact card containing many properties

// console.log(randomName);
// console.log(randomEmail);
// console.log(randomCard);


console.log("==================");
console.log("Welcome to my Shop");
console.log("==================");
for(var i= 0; i < 10; i++){
	var randomProduct = faker.commerce.productName();
	var price = faker.commerce.price();
	console.log(randomProduct + " - $" + price);
}


// console.log(randomProduct);
// console.log(price);