use test
db.grades.aggregate(
    [
        {
            $unwind: "$scores"
        },
        {
            $match: {
                "scores.type": {$in: ["exam", "homework"]}
            }
        },
        {
            $group: {
                _id: {
                    student_id: "$student_id", class_id: "$class_id"
                },
                stu_cla_ave_score: {$avg: "$scores.score"}

            }
        },
        {
            $project: {
                _id: 0,
                stu_id: "$_id.student_id",
                cla_id: "$_id.class_id",
                stu_cla_ave_score: 1
            }
        },
        {
            $group: {
                _id: "$cla_id",
                ave_cla: {$avg: "$stu_cla_ave_score"}
            }
        },
        {
            $sort: {ave_cla: -1}
        }
    ]
);
