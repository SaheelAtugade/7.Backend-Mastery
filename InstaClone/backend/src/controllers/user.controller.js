const userModel = require("../models/user.model")
const followModel = require("../models/follow.model")

async function followUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    // check if followee exist
    const isFolloweeExist = await userModel.findOne({username: followeeUsername})
    if(!isFolloweeExist){
        return res.status(404).json({
            message: "user you trying to follow does not exist"
        })
    }
    // check to not follow himself
    if(followerUsername === followeeUsername){
        return res.status(400).json({
            message: "you cannot follow yourself"
        })
    }
    //check if already followed
    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })
    if(isAlreadyFollowing){
        return res.status(400).json({
            message: `you already follow ${followeeUsername}`,
            isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        message: `you are now following ${followeeUsername}`,
        followRecord
    })
}

async function unfollowUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username


    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(!isUserFollowing){
        return res.status(200).json({
            message: `You are not following ${followeeUsername}`
        })
    }

    await followModel.findOneAndDelete({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(200).json({
        message: `you unfollowed ${followeeUsername}`
    })
}

async function followRequestsController(req, res) {
    const username = req.user.username

    const requests = await followModel.find({followee: username, status: "pending"})
   
    if(requests.length === 0){
        return res.status(200).json({
            message: "no pending requests"
        })
    }

    res.status(200).json({
        message: "You have pending requests",
        requests
    })
}

async function acceptRequestController(req, res) {
    const followerUsername = req.params.username
    const followeeUsername = req.user.username
    
    const followRecord = await followModel.findOneAndUpdate({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"
    }, {
        status: "accepted"
    },{
        new: true,
        runValidators: true
    })

    if(!followRecord){
        res.status(404).json({
            message: "user request not found"
        })
    }

    res.status(200).json({
        message: `You accepted request by ${followerUsername}`,
        followRecord
    })
}

async function rejectRequestController(req, res) {
    const followerUsername = req.params.username
    const followeeUsername = req.user.username

    const followRecord = await followModel.findOneAndUpdate({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"
    },{
        status: "rejected"
    },{
        new: true,
        runValidators: true
    })

    if(!followRecord){
        return res.status(404).json({
            message: "user request doesn't exist"
        })
    }



    res.status(200).json({
        message: `you rejected request by ${followRecord.follower}`,
        followRecord
    })
}

module.exports = {
    followUserController,
    unfollowUserController,
    followRequestsController,
    acceptRequestController,
    rejectRequestController
}