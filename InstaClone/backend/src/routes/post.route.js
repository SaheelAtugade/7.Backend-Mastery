const express = require('express')
const postControllers = require('../controllers/posts.controller')
const postRouter = express.Router()
const multer = require('multer')
const authUser = require('../middlewares/auth.middleware')
const upload = multer({storage: multer.memoryStorage()})


//POST = /api/posts/
postRouter.post("/", upload.single("image"), authUser, postControllers.createPostController)

//GET = /api/posts/
postRouter.get("/", authUser, postControllers.getPostController)

//GET = /api/posts/details/:postId
//-- return detail about specific post with its id
//-- also check wether the post belong to the user that the request comes from
postRouter.get("/details/:postId",authUser, postControllers.getPostDetailsController)

//POST = /api/posts/like/:postId
//-- likes a post with the postId provided in the params
postRouter.post('/like/:postId', authUser, postControllers.likePostController)

module.exports = postRouter