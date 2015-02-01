package com.tengen;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;

import java.net.UnknownHostException;

/**
 * Created by xiaoyazi on 1/20/15.
 */
public class hw2 {
    public static void main(String[] args) throws UnknownHostException{
        MongoClient client = new MongoClient();
        DB db = client.getDB("students");
        DBCollection lines = db.getCollection("grades");
        DBCursor cursor = lines.find().sort(new BasicDBObject("student_id", 1).append("score", 1));
        int studentId = Integer.MAX_VALUE;
        while(cursor.hasNext()) {
            DBObject current = cursor.next();
            int currentStudentId = (Integer) current.get("student_id");
            if (studentId != currentStudentId) {
                System.out.println(current);
                lines.remove(current);
                studentId = currentStudentId;
            }
        }
    }
}
