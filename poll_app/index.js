const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const ejs = require('ejs');
global.currentUser = null;

// connect to database
mongoose.connect('mongodb://localhost/poll_app', {useNewUrlParser: true})

// configur eapp
const app = new express();
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use("*", (req, res, next)=>{
    console.log(`CURRENT USER: ${currentUser}`)
    next();
})

// controllers
const homeController = require('./controllers/homePage');
const browseController = require('./controllers/browsePage');
const newUserController = require('./controllers/newUser');
const newPollController = require('./controllers/newPoll')
const viewAccountController = require('./controllers/viewAccount');
const storePollController = require('./controllers/storePoll')
const storeUserController = require('./controllers/storeUser');
const searchController = require('./controllers/search')
const storeVoteController = require('./controllers/newVote')

app.get('/', homeController)
app.get('/browse', browseController)
app.get('/register', newUserController)
app.get('/create-poll', newPollController)
app.get('/account', viewAccountController)

app.post('/addpoll', storePollController)
app.post('/adduser', storeUserController)
app.post('/search', searchController)
app.post('/vote', storeVoteController)

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{console.log(`Running on port ${PORT}`)})