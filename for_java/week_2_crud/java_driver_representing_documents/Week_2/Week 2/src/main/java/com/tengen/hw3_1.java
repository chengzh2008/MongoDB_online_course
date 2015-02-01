package com.tengen;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;

import java.net.UnknownHostException;
import java.util.List;

/**
 * Created by xiaoyazi on 1/25/15.
 */
public class hw3_1 {
    public static void main(String[] args) throws UnknownHostException {
        MongoClient client = new MongoClient();
        DB db = client.getDB("school");
        DBCollection lines = db.getCollection("students");
        DBCursor cursor = lines.find();
        while(cursor.hasNext()) {
            DBObject current = cursor.next();
            List<DBObject> scores = (List<DBObject>) current.get("scores");
//            System.out.println(scores.toString());

            removeLowerstScore(scores);
//            System.out.println(current.toString());

            lines.update(new BasicDBObject("_id", current.get("_id")), current);


        }
    }

    private static void removeLowerstScore(List<DBObject> scores) {
        int index = 0;
        double minScore = Double.MAX_VALUE;
        DBObject current = null;
        for (int i = 0; i< scores.size(); i++) {
            current = scores.get(i);
            if (current.get("type").equals("homework") && (Double) current.get("score") <= minScore) {
                minScore = (Double) current.get("score");
                index = i;
            }
        }
        scores.remove(index);
    }


}
