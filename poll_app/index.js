const path = require('path')
const { url } = require('inspector');

// express stuff
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const app = new express();

// EXPRESS CONFIG
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

// data
const Poll = require('./models/Poll')
const User = require('./models/User')

var currentUser;

// ROUTE CONFIGURATION
app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/home', (req, res)=>{
    res.render('index')
})

app.get('/browse', async (req, res)=>{
    // grab all rows from database and display them
    let rows = await Poll.find({}).sort({date: -1});
    res.render('browse', {rows: rows})

})

app.get('/register', (req, res)=>{
    res.render('register')
})

app.get('/create-poll', (req, res)=>{
    res.render('create-poll')
})

app.get('/account', (req, res)=>{
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

// POSTING PATHS
// add poll
app.post('/addpoll', (req, res)=>{
    let options = [];
    for (opt in req.body.options){
        options.push({name: req.body.options[opt], votes: 0})
    }
    let data = new Poll({
        title: req.body.title,
        description: req.body.description,
        creator: currentUser,
        options: options
    })

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
    Poll.find({title: new registerExp(req.body.query, 'i')}).sort({date: -1}).exec((err, data)=>{
        res.render('browse', {
            query: req.body.query,
            rows: data
        })
    })
})

// vote
app.post('/vote', async (req, res)=>{
    // grab id of the poll we're voting on
    let optionId = req.body.options
    await Poll.findOneAndUpdate({options: {$elemMatch: {'_id': mongoose.Types.ObjectId(optionId)}}}, {$inc: {'options.$.votes': 1}});
    res.redirect('/browse')
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{console.log(`Running on port ${PORT}`)})