const imagekit = require("@imagekit/nodejs");
const config = require("../config/config");
const { toFile } = require("@imagekit/nodejs");
const crypto = require("crypto");
const postModel = require("../models/post.model");
const likeModel = require("../models/like.model")
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
  const userId = req.user.id;
  const { postId } = req.params;
  const post = await postModel.findById(postId);
  const isUserValid = post.user.toString() === userId;

  if (!isUserValid) {
    return res.status(403).json({
      message: "Forbidden content",
    });
  }

  res.status(200).json({
    message: "post details",
    post,
  });
}

async function likePostController(req, res) {
  const username = req.user.username
  const postId = req.params.postId
  // console.log(postId);

  const post = await postModel.findById(postId)
  console.log(post);
  if(!post){
    return res.status(404).json({
      message: "Post you want to like does not exist"
    })
  }

  const isAlreadyLiked = await likeModel.findOne({
    postId: postId,
    username: username
  })
  if(isAlreadyLiked){
    return res.status(200).json({
      message: "Youe already liked this post"
    })
  }

  const likeRecord = await likeModel.create({
    postId: postId,
    username: username
  })

  res.status(201).json({
    message: "You liked this post",
    likeRecord
  })
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController
};
