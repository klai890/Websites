const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const expressSession = require('express-session');
mongoose.connect('mongodb://localhost/myblog', {useNewUrlParser: true});
global.admin = null;
const User = require('./models/User');

// configure express
const app = new express();
app.set('view engine', 'ejs');

// middleware
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressSession({
    secret: 'keyboard cat' 
}))
app.use('*', (req, res, next)=>{
    admin = req.session.userId;
    next();
})


const homePageController = require('./controllers/homePage')
const aboutPageController = require('./controllers/aboutPage');
const contactPageController = require('./controllers/contactPage');
const loginPageController = require('./controllers/loginPage')
const loginController = require('./controllers/login');
const newPostPageController = require('./controllers/newPostPage')

app.get('/', homePageController)
app.get('/about', aboutPageController)
app.get('/contact', contactPageController);
app.get('/auth/login', loginPageController)
app.get('/new/post', newPostPageController)

app.post('/users/login', loginController)

app.listen(1000,  ()=>{
    console.log('running on port 1000')
})