// FUNCTION TO FIND THE AVERAGE OF SCORES.

function average(arr){
	var result = 0;
	arr.forEach(function(ele){
		result += ele;
	})
	console.log(Math.round(result/ arr.length));
}

var scores = [90, 98, 89, 100, 100, 86, 94];
average(scores);