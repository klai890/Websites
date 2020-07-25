const http = require('http');
const path = require('path')
const fs = require('fs');
const { url } = require('inspector');
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const { profile } = require('console');
const app = express();
mongoose.Promise = global.Promise;
const pollsDatabase = mongoose.createConnection("mongodb://localhost:27017/polls");
const usersDatabase = mongoose.createConnection('mongodb://localhost:27017/users');
var currentUser;

// EXPRESS CONFIG
const router = express.Router();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'public'))
app.use('/', router);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))


// SET DATABASE SCHEMAS
var pollSchema = new mongoose.Schema({
    title: String,
    description: String,
    creator: String,
    date: {type: Date, default: Date.now},
    options: [{type: String}],
    votes: [{}]
});

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    img: String,
    date: {type: Date, default: Date.now}
})

var Poll = pollsDatabase.model("Poll", pollSchema);
var User = usersDatabase.model("User", userSchema)


// ROUTE CONFIGURATION
router.get('/', (req, res)=>{
    res.render('index')
})

router.get('/browse', (req, res)=>{
    // grab all rows from database and display them
    Poll.find({}).sort({date: -1}).exec((err, data)=>{
        res.render('browse', {
            rows: data
        })
    })

})

router.get('/create-poll', (req, res)=>{
    res.render('create-poll')
})

router.get('/account', (req, res)=>{
    // if not logged in, go to register page
    if (!currentUser){
        res.redirect('/register')
    }

    // render account data to screen
    Poll.find({'creator': currentUser}, (err, createdRows)=>{
        if (err) throw err;
        User.findOne({'username': currentUser}, (err, userData)=>{
            profilePicture = userData.img;
            date = [...String(userData.date).split(' ')].slice(0, 4).join(' ')
            if (profilePicture == undefined) profilePicture = 'img/avatar.svg'
            // if no rows, don't send pollsCreated attribute
            res.render('account', {
                username: currentUser, 
                img: profilePicture,
                pollsCreated: createdRows, 
                date: date
            })
        })
    })
})

router.get('/register', (req, res)=>{
    res.render('register')//{message: 'Username already taken'})
})

// POSTING PATHS
// add poll
app.post('/addpoll', (req, res)=>{
    let data = new Poll(req.body)
    data.creator = currentUser;
    // initialize all counts to
    for (opt in data.options){
        let optionName = data.options[opt];
        console.log(data, data.options[opt], data.options)
        data.votes.push({option: optionName, count: 0})
    }
    console.log(data)
    data.save()
    .then(s=>{
        res.redirect('/account')
    })
    .catch(err=>{
        res.status(400).send("Unable to save to database")
    })
})

// add user
app.post('/adduser', (req, res)=>{
    var data = new User(req.body)
    User.findOne({ 'username': data.username}, 'username password', function (err, row) {
        if (err) throw err;
        if (row == null){
            // only add to database when there is no such user
            data.save()
            .then(item=>{
                currentUser = data.username;
                res.redirect('/account')
            })
            .catch(err=>{
                res.status(400).send("Unable to save to database")
            })
            return;
        }
        // if there is a user, may be log in so double check passwords
        if (data.password === row.password){
            currentUser = data.username;
            res.redirect('/account')
        }
        else{
            res.redirect('/register')
        }
      });
     
})

// search functionality browse page
app.post('/search', (req, res)=>{
    Poll.find({title: new RegExp(req.body.query, 'i')}).sort({date: -1}).exec((err, data)=>{
        res.render('browse', {
            query: req.body.query,
            rows: data
        })
    })
})

// vote
app.post('/vote', (req, res)=>{
    // grab id of the poll we're voting on
    let pollId = Object.keys(req.body)[0];
    
    // grab value of the option
    let optionName = Object.values(req.body)[0];

    Poll.findOne({_id: pollId}, 'options votes' , (err, data)=>{
        // grab the index of the key in the options array, 
        if (err) throw err;
        let index = data.options.indexOf(optionName);
        // and increment the corresponding vote count in the votes array
        console.log(data.votes[index].count)
         
    })

    res.send(`${optionName}, ${pollId}`)
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{console.log(`Running on port ${PORT}`)})