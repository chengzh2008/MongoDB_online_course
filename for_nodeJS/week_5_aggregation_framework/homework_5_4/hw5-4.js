use test
db.zips.aggregate(
    [
        {
            $project: {
                _id: 1,
                city: 1,
                firstC: {$substr: ["$city", 0, 1]},
                pop: 1,
                state: 1
            }
        },
        {
            $sort: {
                city: 1
            }
        },
        {
            $match: {
                $and: [{firstC: {$gte: "0"}}, {firstC: {$lte: "9"}}]
            }
        },
        {
            $group: {
                _id: 1,
                count: {$sum:"$pop"}
            }
        }
    ]
)
