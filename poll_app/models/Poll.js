const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PollSchema = new Schema({
    title: String,
    description: String,
    creator: String,
    date: {type: Date, default: Date.now},
    votes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vote'
    }],
    options: Schema.Types.Mixed
});

const Poll = mongoose.model('Poll', PollSchema)
module.exports = Poll;