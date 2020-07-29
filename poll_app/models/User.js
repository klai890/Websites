const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

var UserSchema = new Schema({
    username: String,
    password: String,
    img: String,
    date: {type: Date, default: Date.now}
})

// hash the password before saving
UserSchema.pre('save', function(next){
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash)=>{
        user.password = hash;
        next();
    })
})

const User = mongoose.model('User', UserSchema);
module.exports = User;