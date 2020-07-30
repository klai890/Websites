const User = require('../models/User');

module.exports = (req, res)=>{
    res.render('account', {username: user.username})
}