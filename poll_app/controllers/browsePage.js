const Poll = require('../models/Poll')

module.exports = async (req, res)=>{
    // grab all rows from database and display them
    let rows = await Poll.find({}).sort({date: -1})
    res.render('browse', {rows})

}