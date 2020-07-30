const BlogPost = require('../models/BlogPost');

module.exports = async (req, res)=>{
    let posts = await BlogPost.find({}).sort({date: -1});
    console.log(posts);
    res.render('home', {posts: posts})
}