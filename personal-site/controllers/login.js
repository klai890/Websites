const User = require("../models/User")
const bcrypt = require('bcrypt')

module.exports = (req, res)=>{
    const {password} = req.body;
    User.findOne({username: 'admin'}, (err, user)=>{
        if (user){
            bcrypt.compare(password, user.password, (err, same)=>{
                if (same){
                    req.session.userId = user._id;
                    res.redirect('/')
                }
                else{
                    res.redirect('/auth/login')
                }
            })
        }
        else{
            res.redirect('/auth/login')
        }
    })
};