const { default: mongoose } = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "post is required"],
    },
    username: {
      type: String,
      required: [true, "username is required"],
    },
  },
  { timestamps: true },
);

likeSchema.index({post_id: 1, username: 1}, {unique: true})

const likeModel = mongoose.model("likes", likeSchema)
module.exports = likeModel