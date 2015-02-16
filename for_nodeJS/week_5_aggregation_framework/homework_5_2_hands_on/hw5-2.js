use test
db.zips.aggregate(
    [
        {
            $match: {
                state: {$in: ["CA", "NY"]}
            }
        },
        {
            $group: {
                _id: {
                    city: "$city", state: "$state"
                },
                total_pop: {$sum: "$pop"}
            }
        },
        {
            $match: {
                total_pop: {$gt: 25000}
            }
        },
        {
            $group: {
                _id:1,
                ave_pop: {$avg: "$total_pop"}
            }
        }
    ]
)
