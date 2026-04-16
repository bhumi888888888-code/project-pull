import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";



export const addToCart = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found",404))
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found",404))
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({ user: userId , items: [{ product: productId, quantity: quantity || 1 }]})
    return res.status(201).json({
      cart
    })
  }

  //check if product already in cart
  const itemsIndex = cart.items.findIndex(
    item => item.product.toString() === productId
  )

  if (itemsIndex > -1) {
    //upadte quantity
    cart.items[itemsIndex].quantity += quantity || 1;
  } else {
    // add new item
    cart.items.push({
      product: productId,
      quantity: quantity || 1
    });
  }

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Added to cart",
    data: {cart},
  })

})

export const getCart = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  res.status(200).json({
    success: true,
    data: {cart}
  })

})



































// export const deleteProduct = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;

//   const product = await productServices.getProductById(id);
//   if (!product) {
//     return next(new ErrorHandler("Product not found",404))
//   }

//   // const files = product.images;
//   // if (files) {
//   //   for(const file of files)
//   //   await cloudinary.uploader.destroy(file.public_id)
//   // }


//   if (product.images && product.images.length > 0) {
//     await Promise.all(
//       product.images.map(async (img) => {
//         await cloudinary.uploader.upload(file.tempFilePath, {
//       folder: "product_images"
//     })
//     images.push({
//       public_id: result.public_id,
//       url: result.secure_url,
//     })(img.public_id)
//       })
//     )
//   }

//   await product.deleteOne()

//   res.status(200).json({
//     success: true,
//     message: "Product deleted successfully"
//   })

// })




































  // if (!req.files || Object.keys(req.files).length === 0) {
  //   return next(new ErrorHandler("No images uploaded, At least one image is required", 400))
  // }










































// export const createProduct = asyncHandler(async (req, res, next) => {
//   const { title, description, price, stock, category } = req.body;
//   // const userId = req.user._id;

//     if (!title || !description || !price || !stock || !category) {
//     return next(new ErrorHandler("All fields are required",400))
//     }

//   if (!req.files || !req.files.images) {
//     return next(new ErrorHandler("No images uploaded",400))
//   }


//   // let images = [];/

//   const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

//   const images = await Promise.all(
//     files.map(async (file) => {
//       const result = await cloudinary.uploader.upload(file.tempFilePath, {
//         folder: "product_images"
//       })
//       return {
//         public_id: result.public_id,
//         url: result.secure_url,
//       }
//     })
//   )
//   // for (const file of files) {
//   //   const result = await cloudinary.uploader.upload(file.tempFilePath, {
//   //     folder: "product_images"
//   //   })
//   //   images.push({
//   //     public_id: result.public_id,
//   //     url: result.secure_url,
//   //   })
//   // }


//   // const user = await userServices.getUserById(userId);

//   const productInfo = {
//     title,
//     description,
//     price,
//     stock,
//     category,
//     images,
//     seller: req.user._id,
//   }

//   const product = await Product.create(productInfo)

//   res.status(201).json({
//     success: true,
//     message: "Product created successfully",
//     data: {product}
//   })

// })
