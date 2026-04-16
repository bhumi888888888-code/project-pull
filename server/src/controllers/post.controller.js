import cloudinary from "../config/cloudinary.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

// export const createPost = asyncHandler(async (req, res, next) => {
//   const { text } = req.body;
//   const userId = req.user._id;


//     let imageData = [];
//   let videoData = [];

//   if (!text && !req.files) {
//     return next(new ErrorHandler("Post content cannot be empty", 400));
//   }



//   if (req.files && req.files.images) {
//     const images = Array.isArray(req.files.images)
//       ? req.files.images
//       : [req.files.images];

//     // const imageData;

//     try {
//       imageData = await Promise.all(
//         images.map(async (image) => {
//           const result = await cloudinary.uploader.upload(image.tempFilePath, {
//             folder: "posts/images",
//           });

//           return {
//             public_id: result.public_id,
//             url: result.secure_url,
//           };
//         }),
//       );
//     } catch (error) {
//       return next(new ErrorHandler("Cloudinary error", error));
//     }
//   }



//   if (req.files && req.files.videos) {
//     const videos = Array.isArray(req.files.videos)
//       ? req.files.videos
//       : [req.files.videos];

//     // let videoData;

//     try {
//       videoData = await Promise.all(
//         videos.map(async (video) => {
//           const result = await cloudinary.uploader.upload(video.tempFilePath, {
//             folder: "posts/videos",
//           });

//           return {
//             public_id: result.public_id,
//             url: result.secure_url,
//           };
//         }),
//       );
//     } catch (error) {
//       return next(new ErrorHandler("Cloudinart error", error));
//     }
//   }

//   const post = await Post.create({
//     user: userId,
//     text,
//     images: imageData,
//     videos: videoData,
//     recentComments: [], //initially empty,
//     commentCount: 0,
//     likes: 0,
//   });

//   res.status(201).json({
//     success: true,
//     message: "Post created successfully",
//     post,
//   });
// });
export const createPost = asyncHandler(async (req, res, next) => {
  const { text } = req.body;
  const userId = req.user._id;

  let imageData = [];
  let videoData = [];

  // Check if files exist
  if (!text && (!req.files || Object.keys(req.files).length === 0)) {
    return next(new ErrorHandler("Post content cannot be empty", 400));
  }

  // Handle Images
  if (req.files && req.files.images) {
    const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
    try {
      imageData = await Promise.all(
        images.map(async (image) => {
          const result = await cloudinary.uploader.upload(image.tempFilePath, {
            folder: "posts/images",
          });
          return { public_id: result.public_id, url: result.secure_url };
        })
      );
    } catch (error) {
      console.error("Cloudinary Image Error:", error);
      return next(new ErrorHandler("Failed to upload images to Cloudinary", 500));
    }
  }

  // Handle Videos
  if (req.files && req.files.videos) {
    const videos = Array.isArray(req.files.videos) ? req.files.videos : [req.files.videos];
    try {
      videoData = await Promise.all(
        videos.map(async (video) => {
          // CRITICAL: resource_type must be "video"
          const result = await cloudinary.uploader.upload(video.tempFilePath, {
            folder: "posts/videos",
            resource_type: "video", // MUST HAVE THIS FOR VIDEOS
          });
          return { public_id: result.public_id, url: result.secure_url };
        })
      );
    } catch (error) {
      console.error("Cloudinary Video Error:", error);
      return next(new ErrorHandler("Failed to upload video to Cloudinary", 500));
    }
  }

  const post = await Post.create({
    user: userId,
    text,
    images: imageData,
    videos: videoData,
    recentComments: [],
    commentCount: 0,
    likes: 0,
  });

  res.status(201).json({
    success: true,
    message: "Post created successfully",
    post,
  });
});

export const getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().populate('user', 'name profilePic comments likes savedPosts').sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    posts,
  });
});

export const deletePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  if (!post) {
    return next(new ErrorHandler("Post not found",404))
  }

  if (post.videos || post.videos.length > 0) {
    await Promise.all(
      post.videos.map(async(video) => {
        await cloudinary.uploader.destroy(video.tempFilePath)
      })
    )
  }

  await post.deleteOne();

  res.status(200).json({
    success: true,
    message: "Post deleted successfully",
    id,
  })


})

export const likePost = asyncHandler(async (req, res, next) => {
  const { postId } = req.body;
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found",404))
  }

  const post = await Post.findById(postId);
  if (!post) {
    return next(new ErrorHandler("Post not found",404))
  }


  const isLiked = post.likes.includes(userId);

  const userUpdate = isLiked ? { $pull : {likedPosts: postId}} : {$addToSet: {likedPosts : postId}}

  const postUpdate = isLiked ? { $pull: { likes: userId }, $inc: { likesCount: -1 } } :
    { $addToSet: {likes: userId}, $inc: {likesCount: 1} }

  const [updatedUser] = await Promise.all([
    User.findByIdAndUpdate(userId, userUpdate , {new: true}).lean(),
    Post.findByIdAndUpdate(postId, postUpdate , {new: true}).lean(),
  ])

  res.status(200).json({
    success: true,
    message: isLiked ? "Like removed" : "Post Liked",
    isLiked: !isLiked,
    likesCount: isLiked? post.likes.length - 1 : post.likes.length +1
  })

})

//delete and get id should be in params else we can store it in the body
