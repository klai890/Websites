const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const ejs = require('ejs');

// connect to database
mongoose.connect('mongodb://localhost/poll_app', {useNewUrlParser: true})

// configur eapp
const app = new express();
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// controllers
const homeController = require('./controllers/homePage');

app.get('/', homeController)

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{console.log(`Running on port ${PORT}`)})