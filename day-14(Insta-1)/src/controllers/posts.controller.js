const imagekit = require("@imagekit/nodejs");
const config = require("../config/config");
const { toFile } = require("@imagekit/nodejs");
const crypto = require("crypto");
const postModel = require("../models/post.model");
const client = new imagekit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {

  const file = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: req.file.fieldname + "-" + crypto.randomBytes(12).toString("hex"),
    folder: "Cohort-backend-insta-clone",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

async function getPostController(req, res) {
  

  const posts = await postModel.find({
    user: req.user.id,
  });

  res.status(200).json({
    message: "Posts fetched",
    posts,
  });
}


async function getPostDetailsController(req, res) {


  const userId = req.user.id
  const { postId } = req.params;
  const post = await postModel.findById(postId);
  const isUserValid = post.user.toString() === userId;

  if(!isUserValid){
    return res.status(403).json({
        message: "Forbidden content"
    })
  }

  res.status(200).json({
    message: "post details",
    post,
  });
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
};
