use blog
db.posts.aggregate(
    [
        {
            $unwind: "$comments"
        },
        {
            $group: {
                _id: "$comments.author", count: {$sum:1}
            }
        },
        {
            $project: {_id: 0, commentAuth: "$_id", count: 1}
        },
        {$sort: {count:-1}}
    ]
).pretty();