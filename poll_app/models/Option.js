const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var OptionSchema = new Schema({
    name: String,
    votes: {type: Number, default: 0}
})

const Option = mongoose.model('Option', OptionSchema);
module.exports = Option;