const http = require('http');
const path = require('path')
const fs = require('fs');
const { url } = require('inspector');
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express();
mongoose.Promise = global.Promise;
const pollsDatabase = mongoose.createConnection("mongodb://localhost:27017/polls");
const usersDatabase = mongoose.createConnection('mongodb://localhost:27017/users');
const currentUser = null;

// set up database schemas
var pollSchema = new mongoose.Schema({
    title: String,
    description: String,
    creator: String,
    date: {type: Date, default: Date.now},
    options: [{type: String}],
    voters: [{
        username: {type: String},
        votes: [{type: String}]
    }]
});

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    img: String,
    links: [{type: String}]
})

var Poll = pollsDatabase.model("Poll", pollSchema);
var User = usersDatabase.model("User", userSchema)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


// serves ALL of the static files (those in public folder)
app.use(express.static(path.join(__dirname, 'public')))

// posting paths
// handles create poll form submission, adds to database
app.post('/addpoll', (req, res)=>{
    let data = new Poll(req.body)
    console.log(data, req.body)
    data.save()
    .catch(err=>{
        res.status(400).send("Unable to save to database")
    })
})

// handles create user form submission, adds to database
app.post('/adduser', (req, res)=>{
    let data = new User(req.body)
    console.log(data)
    data.save()
    .then(item=>{
        res.redirect('account.html')
    })
    .catch(err=>{
        res.status(400).send("Unable to save to database")
    })
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{console.log(`Running on port ${PORT}`)})