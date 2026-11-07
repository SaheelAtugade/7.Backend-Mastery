const express = require('express')
const postControllers = require('../controllers/posts.controller')
const postRouter = express.Router()
const multer = require('multer')
const authUser = require('../middlewares/auth.middleware')
const upload = multer({storage: multer.memoryStorage()})


/**
 * @route   POST = /api/posts/
 * @desc    Creating a post
 * @access  private
 */
postRouter.post("/", upload.single("image"), authUser, postControllers.createPostController)

/**
 * @route   GET = /api/posts/
 * @desc    getting posts of logged user
 * @access  private
 */
postRouter.get("/", authUser, postControllers.getPostController)

/**
 * @route   DELETE = api/posts/:postId
 * @desc    deleting a post
 * @access  private
 */
postRouter.delete("/:postId", authUser, postControllers.deletePostController)


/**
 * @route   GET = /api/posts/details/:postId
 * @desc    return detail about specific post with its id and also check wether the post belong to the user that the request comes from
 * @access  private
 */
postRouter.get("/details/:postId",authUser, postControllers.getPostDetailsController)

/**
 * @route   POST = /api/posts/like/:postId
 * @desc    likes a post with the postId provided in the params
 * @access  private
 */
postRouter.post('/like/:postId', authUser, postControllers.likePostController)

/**
 * @route   DELETE = /api/posts/like/:postId
 * @desc    Unlikes a post with the postId provided in the params
 * @access  private
 */
postRouter.delete('/like/:postId', authUser, postControllers.unlikePostController)

/**
 * @route   GET = /api/posts/feed
 * @desc    get all posts from DB
 * @access  private
 */
postRouter.get("/feed", authUser, postControllers.getFeedController)

module.exports = postRouter