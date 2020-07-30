const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please enter a title"],
        unique: true,
    },
    body: {
        type: String,
        required: [true, "Please enter body text"]
    },
    date: {type: Date, default: new Date()},
    image: {
        type: String,
        required: [true, "Please enter an image"]
    }
})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
module.exports = BlogPost;