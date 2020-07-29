const Poll = require('../models/Poll')

module.exports = (req, res)=>{
    let options = [];
    console.log(req.body.options)
    for (opt in req.body.options){
        options.push({name: req.body.options[opt], votes: 0})
    }
    let obj = {};
    for (o in options){
        obj[options[o].name] = {votes: 0};
    }
    console.log(obj)

    let data = new Poll({
        title: req.body.title,
        description: req.body.description,
        creator: currentUser,
        options: obj
    })

    data.save()
    .then(s=>{
        res.redirect('/account')
    })
    .catch(err=>{
        res.status(400).send("Unable to save to database")
    })
}