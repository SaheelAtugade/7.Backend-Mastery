const express = require('express')
const { createPostController, getPostController, getPostDetailsController } = require('../controllers/posts.controller')
const postRouter = express.Router()
const multer = require('multer')
const identifyUser = require('../middlewares/auth.middleware')
const upload = multer({storage: multer.memoryStorage()})


//POST = /api/posts/
postRouter.post("/", upload.single("image"), identifyUser, createPostController)

//GET = /api/posts/
postRouter.get("/", identifyUser, getPostController)

//GET = /api/posts/details/:postId
//-- return detail about specific post with its id
//-- also check wether the post belong to the user that the request comes from
postRouter.get("/details/:postId",identifyUser, getPostDetailsController)

module.exports = postRouter