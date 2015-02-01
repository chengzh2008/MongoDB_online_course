var scores = [ 
	{ "type" : "exam", "score" : 1.463179736705023 }, 
	{ "type" : "quiz", "score" : 11.78273309957772 }, 
	{ "type" : "homework", "score" : 6.676176060654615 }, 
	{ "type" : "homework", "score" : 23.8740349954354 },
	{ "type" : "homework", "score" : 18.8740349954354 },
	{ "type" : "homework", "score" : 66.8740349954354 },
	{ "type" : "homework", "score" : 95.8740349954354 } ];

var homeworkFilter = function(score) {
	return score.type === "homework";
}

var lowestScore = function(a, b) {
	return a.score <= b.score ? a : b;
}



// console.log(scores.filter(homeworkFilter));
// console.log(scores.reduce(lowestScore));

var theLowestOne = scores.filter(homeworkFilter).reduce(lowestScore);
console.log(scores.splice(scores.indexOf(theLowestOne), 1));
console.log(scores)