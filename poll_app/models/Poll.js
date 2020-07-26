const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pollsDatabase = mongoose.createConnection("mongodb://localhost:27017/polls", {useNewUrlParser: true});

const PollSchema = new Schema({
    title: String,
    description: String,
    creator: String,
    date: {type: Date, default: Date.now},
    options: [
        {
            name: String,
            votes: Number
        }

    ] 
});

const Poll = pollsDatabase.model('Poll', PollSchema)
module.exports = Poll;