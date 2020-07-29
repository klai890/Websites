const Poll = require('../models/Poll')
const mongoose = require('mongoose')

module.exports = async (req, res)=>{
    let data = req.body.options.split(';')
    // we're sending a value like 'ID: 5f1fa401fbcd843dfd98de1a OPTION: opt1' through name's (name=option)'s value
    let pollId = data[0].split(':')[1];
    let optName = data[1].split(':')[1];
    console.log(data, pollId, optName)
    await Poll.findByIdAndUpdate(pollId, {number: 233232});

    res.redirect('/browse')
};