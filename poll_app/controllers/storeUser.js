const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports =  async (req, res)=>{
    var data = new User(req.body)
    // if no such user
    let row = await User.findOne({ 'username': data.username}, 'username password');
    if (row == null){
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

    // if existing user
    bcrypt.compare(data.password, row.password, (err, same)=>{
        if (err) return err;
        if (same){
            currentUser = data.username;
            res.redirect('/account')
        }
        else{
            res.redirect('/register')
        }
    })
     
};