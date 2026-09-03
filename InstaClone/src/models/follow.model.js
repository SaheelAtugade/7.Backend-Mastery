const { default: mongoose } = require("mongoose");

const followSchema = new mongoose.Schema({
    follower:{
        type: String,
        required: [true, "follower is required"]
    },
    followee:{
        type: String,
        reqiured: [true, "followee is required"]
    },
    status: {
        type: String,
        default: "pending",
        enum: {
            values: ["pending", "accepted", "rejected"],
            message: "status can only be pending. accepted or rejected"
        }
    }
},{
    timestamps: true
})

followSchema.index({followee: 1, followee: 1}, {unique: true})

const followModel = mongoose.model("follows",followSchema)
module.exports = followModel