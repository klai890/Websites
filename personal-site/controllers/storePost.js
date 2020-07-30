const BlogPost = require('../models/BlogPost');
const path = require('path');

module.exports = async (req, res)=>{
    // set image, image extension, image name, and upload path
    let image = req.files.image;
    let ext = image.name.split('.')[1]
    let newImageName = `img${count}.${ext}`;
    let uploadPath = path.dirname(__dirname);

    await BlogPost.create({...req.body, image: `/img/${newImageName}`})

    // find id, and reset image name
    let id = await BlogPost.find({title: req.body.title}, '_id');
    id = id[0]._id;
    newImageName = `/img/img${id}.${ext}`;

    await BlogPost.findByIdAndUpdate(id, {image: newImageName})
    await image.mv(path.resolve(uploadPath, 'public/img', `img${id}.${ext}`));
    res.redirect('/')
}