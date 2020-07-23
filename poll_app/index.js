const http = require('http');
const path = require('path')
const fs = require('fs');
const { url } = require('inspector');
const {MongoClient} = require('mongodb');
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'polls'


const server = http.createServer((req, res)=> urlManage(req, res));

// manage url paths
function urlManage(req, res){
    // get file path and type
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    let extname = path.extname(filePath);

    switch(extname){
        case '.html': contentType = 'text/html'; break;
        case '.js': contentType = 'text/javascript'; break;
        case '.css': contentType = 'text/css'; break;
        case '.json': contentType = 'application/json'; break;
        case '.png': contentType = 'image/png'; break;
        case '.jpg': contentType = 'image/jpg'; break;
        case '.svg': contentType = 'image/svg+xml'; break;
    }

    load(filePath, contentType, res);
}

// load files
function load(filePath, contentType, res){
    fs.readFile(filePath, (err, content)=>{
        let status = errHandle(err, res);
        if (status !== 200) return;
        res.writeHead(status, {'Content-Type': `${contentType}`});
        res.end(content, 'utf-8');
    })
}

// handle errors
function errHandle(err, res){
    if (err){
        if (err.code === 'ENOENT'){
            load(path.join(__dirname, 'public', '404.html'), 'text/html', res); 
            return 404
        }
        load(path.join(__dirname, 'public', 'error.html'), 'text/html', res)
        return false;
    }
    else{
        return 200
    }
}

// connect and add to database
function addToDatabase(data, collection, rows){
    MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
        if (error) throw error;
        const db = client.db(databaseName);
        if (rows > 1) insertRows(data, db, collection);
        else insertRow(data, db, collection)
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

const PORT = process.env.PORT || 8000;
server.listen(PORT, ()=>{console.log(`Running on port ${PORT}`)})