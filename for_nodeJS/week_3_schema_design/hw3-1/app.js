var client = require('mongodb').MongoClient;

var homeworkFilter = function(score) {
    return score.type === "homework";
}

var lowestScore = function(a, b) {
    return a.score <= b.score ? a : b;
}

client.connect('mongodb://localhost:27017/school', function(err, db) {
    if (err) throw err;
 
    var query = {};
    // var projection = {'State':1, 'Temperature':1};
 
    var cursor = db.collection('students').find(query);
 
    // Sort by state and then by temperature (decreasing)
    // cursor.sort([['State',1], ['Temperature',-1]]);
 
    // var state = ''; // initialize to dummy value
    // var operator = {'$set':{'month_high':true}};
    var scores, theLowestOne, operator;
    cursor.each(function(err, doc) {
        if (err) throw err;
 
        if (doc == null) {
            return db.close();
        } else {
            console.log("Processing........");
            scores = doc.scores;
            console.log(scores);
            theLowestOne = scores.filter(homeworkFilter).reduce(lowestScore);
            scores.splice(scores.indexOf(theLowestOne), 1);
            console.log(scores);
            operator = {"$set": {
                "scores": scores
            }}
            db.collection('students').update({'_id':doc._id}, operator, function(err, updated) {
                if (err) throw err;
            });
        }
    });
});