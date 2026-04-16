import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

// export const addToWishlist = asyncHandler(async (req, res, next) => {
//   const { productId } = req.body;
//   const userId = req.user._id;


//   //check if alreasy exists
//   const productExists = await Product.exists({ _id: productId });
//   if (!productExists) {
//     return next(new ErrorHandler("Product not found", 404))
//   }

//   ///atomic updates
//   const user = await User.findById(userId);
//   if (!user) {
//     return next(new ErrorHandler("User not found",404))
//   }

//   const isAlreadyWishlisted = user.wishlist.some((id) => id.toString() === productId.toString());

//   let updatedUser;

//   if (isAlreadyWishlisted) {
//     updatedUser = await User.findByIdAndUpdate(userId, {$pull: {wishlist: productId}},{new : true})
//   } else {
//     updatedUser = await User.findByIdAndUpdate(userId, {$addToSet: {wishlist: productId}},{new: true})
//   }



//   res.status(200).json({
//     success: true,
//     message: isAlreadyWishlisted ? "Removed from wishlist" : "Added to wishlists",
//     wishlist: updatedUser.wishlist,
//   })
// })

export const addToWishlist = asyncHandler(async (req, res, next) => {
  const { productId } = req.body;
  const userId = req.user._id;


  //check if alreasy exists
  const productExists = await Product.findById(productId );
  if (!productExists) {
    return next(new ErrorHandler("Product not found", 404))
  }

  ///atomic updates
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found",404))
  }

  const isAlreadyWishlisted = user.wishlist.some((id) => id.toString() === productId.toString());

  let updatedUser;

  if (isAlreadyWishlisted) {
    updatedUser = await User.findByIdAndUpdate(userId, {$pull: {wishlist: productId}},{new : true})
  } else {
    updatedUser = await User.findByIdAndUpdate(userId, {$push: {wishlist: productId}},{new: true})
  }



  res.status(200).json({
    success: true,
    message: isAlreadyWishlisted ? "Removed from wishlist" : "Added to wishlists",
    wishlist: updatedUser.wishlist,
  })
})
