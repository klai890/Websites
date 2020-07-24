// A bunch of functions which handle data
const {MongoClient} = require('mongodb');
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'polls'

// connect and add to database
function addToDatabase(data, collection, rows){
    MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
        if (error) throw error;
        const db = client.db(databaseName);
        if (rows > 1) insertRows(data, db, collection);
        else insertRow(data, db, collection)
        console.log("Inserted row.")
    })
}

// insert row into database (used by addToDatabase)
function insertRow(data, db, collection){
    db.collection(collection).insertOne(data, (err, res)=>{
        if (err) throw err;
        console.log(res.ops)
    })
}

// insert rows into database (used by addToDatabase)
function insertRows(data, db, collection){
    db.collection(collection).insertMany(data, (err, res)=>{
        if (err) throw err;
        console.log(res.ops)
    })
}

// see a collection
function seeCollection(collection){
    MongoClient.connect(connectionURL, {useNewUrlParser: true}, (err, client)=>{
        if (err) throw err;
        let db = client.db(databaseName);

        db.collection(collection).find().toArray((err, data)=>{
            if (err) throw err;
            console.log(data)
        })
    })
}

module.exports = {
    addToDatabase: addToDatabase,
    seeCollection: seeCollection
};
