const mongodb = require("mongodb")
const MongodbClient = mongodb.MongoClient

const connUrl = 'mongodb://127.0.0.1:27017'
const databasename = "task-manager"

MongodbClient.connect(connUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('unable to connect to database')
    }


    const db = client.db(databasename)

    // db.collection('users').insertMany([{
    //         name: 'rounak',
    //         age: 20
    //     },
    //     {
    //         name: 'sawan',
    //         age: 20
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert Documents!')
    //     }

    //     console.log(result.ops)
    // })


    db.collection('tasks').insertMany([{
            description: 'Take 6 hour sleep',
            complete: false
        },
        {
            description: 'Read lesson 2 of English Litrature',
            complete: false
        },
        {
            description: 'Practice coding',
            complete: true
        },
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert Documents!')
        }

        console.log(result.ops)
    })

})