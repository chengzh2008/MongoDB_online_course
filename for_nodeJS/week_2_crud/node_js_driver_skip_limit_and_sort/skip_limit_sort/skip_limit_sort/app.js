var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
    if(err) throw err;

    var data = db.collection('data');
    var query = {};
    var projection = {"State": 1, "Temperature": -1};

    var cursor = data.find(query, projection);
    cursor.sort([["State", 1], ["Temperature", -1]]);
    
    var previousState = "";
    var operator = {"$set": {"month_high": true}};
    cursor.each(function(err, doc) {
        if(err) throw err;
        if(doc == null) {
            return db.close();
        }
        if (doc.State !== previousState) {
            previousState = doc.State;
            data.update({'_id': doc._id}, operator, function(err, updated){
                if (err) throw err;
            });
        }
        console.dir(doc);
    });
});
