import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recentComments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    text: String,
    createdAt: Date,
    likes: Number,
  }],
  commentCount: {
    type: Number,
    default: 0,
  },
  text: {
    type: String,
    trim: true,
    default: "",
  },
  images:[ {
    public_id: String,
    url: String,
  }],
  videos: [{
    public_id: String,
    url: String,
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  likesCount: {type: Number, default :0}
}, {timestamps: true})

postSchema.index({ user: 1, createdAt: -1 });

const Post = mongoose.model("Post", postSchema)
export default Post;
