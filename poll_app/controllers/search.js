const Poll = require('../models/Poll')

module.exports = (req, res)=>{
    Poll.find({title: new RegExp(req.body.query, 'i')}).sort({date: -1}).exec((err, data)=>{
        res.render('browse', {
            query: req.body.query,
            rows: data
        })
    })
}