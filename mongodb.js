const mongodb = require("mongodb")
const MongodbClient = mongodb.MongoClient

const connUrl = 'mongodb://127.0.0.1:27017'
const databasename = "task-manager"

MongodbClient.connect(connUrl, { useNewUrlParser: true }, (error, client) => {
    if(error){
        return console.log('unable to connect to database')
    }


    const db = client.db(databasename)

    db.collection('users').insertOne({
        name: 'chetan',
        age : 20
    })

})