var request = require('request');

// USING REQUEST PACKAGE BY REQUESTING THE API 

request('https://jsonplaceholder.typicode.com/users/1', function(error, response, body){
	if(!error && response.statusCode === 200){
		var parsedData = JSON.parse(body)
		console.log(parsedData);
	}
});