const {MongoClient, ObjectID} = require("mongodb")

const connUrl = 'mongodb://127.0.0.1:27017'
const databasename = "task-manager"

MongoClient.connect(connUrl, { useNewUrlParser: true }, (error, client) => {
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


    // db.collection('tasks').insertMany([{
    //         description: 'Take 6 hour sleep',
    //         complete: false
    //     },
    //     {
    //         description: 'Read lesson 2 of English Litrature',
    //         complete: false
    //     },
    //     {
    //         description: 'Practice coding',
    //         complete: true
    //     },
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert Documents!')
    //     }

    //     console.log(result.ops)
    // })






    // db.collection('users').findOne({_id: new ObjectID("5cf802cd1dbacf3974c34507")}, (error , user) => {
    //     if(error){
    //         return console.log('Unable to find data')
    //     }

    //     console.log(user)
    // })


    // db.collection('users').find({age: 22}).toArray((error, users) => {
    //     if(error){
    //         return console.log('Unable to find data')
    //     }
    //     console.log(users)
    // })

    
    // db.collection('users').find({age: 20}).count((error, count) => {
    //     if(error){
    //         return console.log('Unable to find data')
    //     }
    //     console.log(count)
    // })

    db.collection('users').updateOne({
        _id: new ObjectID('5cf802cd1dbacf3974c34507')
    }, {
        $set: {
            name: 'Chetan Pawar'
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    db.collection('tasks').updateMany({
        complete: false
    }, {
        $set: {
            complete: true
        }
    }).then((result) => {
        console.log(result.modifiedCount)
    }).catch((error) => {
        console.log(error)
    })
})