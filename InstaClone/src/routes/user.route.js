const express = require('express')
const userControllers = require('../controllers/user.controller')
const authUser = require('../middlewares/auth.middleware')
const userRouter = express.Router()

//Post = /api/users/follow/:username
userRouter.post('/follow/:username', authUser, userControllers.followUserController)

//Post = /api/users/unfollow/:username
userRouter.post('/unfollow/:username', authUser, userControllers.unfollowUserController)

//GET = /api/users/follow/requests
//-- get all pending request
userRouter.get('/follow/requests', authUser, userControllers.followRequestsController)

//POST = api/users/follow/accept/:username
//-- accept request using username
userRouter.post('/follow/accept/:username', authUser, userControllers.acceptRequestController)

//POST = api/users/follow/reject/:username
//-- reject request using username
userRouter.post('/follow/reject/:username', authUser, userControllers.rejectRequestController)


module.exports = userRouter