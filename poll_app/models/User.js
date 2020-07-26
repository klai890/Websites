const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersDatabase = mongoose.createConnection('mongodb://localhost:27017/users', {useNewUrlParser: true});

var UserSchema = new Schema({
    username: String,
    password: String,
    img: String,
    date: {type: Date, default: Date.now}
})

const User = usersDatabase.model('User', UserSchema);
module.exports = User;