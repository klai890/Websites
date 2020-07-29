const Poll = require('../models/Poll');
const User = require('../models/User')

module.exports = async (req, res)=>{
    if (!currentUser){
        res.redirect('/register')
    }

    let createdRows = await Poll.find({'creator': currentUser});
    let user = await User.findOne({'username': currentUser});

    let profilePicture = user.img === undefined ? 'img/avatar.svg' : user.img;
    let date = user.date;

    res.render('account', {
        username: currentUser, 
        img: profilePicture,
        pollsCreated: createdRows, 
        date: date
    })
}