import cloudinary  from "../config/cloudinary.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import * as productServices from "../services/productServices.js"
import * as userServices from "../services/userServices.js";

export const createProduct = asyncHandler(async (req, res, next) => {
  //  console.log("STEP 1")
  const {title ,description, stock ,price, category } = req.body;
  //  console.log("STEP 2", req.body)
  if (!title || !description || !stock || !price || !category) {
    return next(new ErrorHandler("All fields are required", 400))
  }

  if (!req.files || !req.files.images) {
    //  console.log("STEP 3 fail")
    return next(new ErrorHandler("No images uploaded, at least one image is required",400))
  }
//  console.log("STEP 3 ok")

  // console.log("FILES", req.files)
  // console.log("Body", req.body)

  const files = Array.isArray(req.files.images)
    ? req.files.images
    : [req.files.images];
  //  console.log("STEP 4 files", files)

  let images ;
  try {
   images = await Promise.all(
  files.map(async (file) => {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "product_images",
    });

    return {
      public_id: result.public_id,
      url: result.secure_url,
    };
  })
);
  } catch (error) {
    console.log("UPLOAD ERROR:", error);
    return next(new ErrorHandler("Images upload failed", 500))
    throw error;
  }
  console.log(req.user)
  //  console.log("STEP 5 before db")

  const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()

  const productInfo = {
    title,
    description,
    price: Number(price),
    stock: Number(stock),
    category: normalizedCategory,
    images,
    seller: req.user?._id,
  }

  let product;
  try {
     product = await Product.create(productInfo);
    // console.log("Product created ")
  } catch (error) {
    console.log("Mongoose error:", error)
    throw error;
  }

  // console.log(" step 6 created")
  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: {product},
  })
})

export const getProducts = asyncHandler(async (req, res, next) => {
  const { category } = req.params;

  const filter = {};
  if (category) {
    filter.category = category
  }
  try {
  const products = await Product.find(filter).sort({createdAt: -1});
  res.status(200).json({
    success: true,
    data: {products}
  })
  } catch (error) {
   console.error("Errors getting products", error)
   next(error)
  }

})

 export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await productServices.getProductById(id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  if (product.images && product.images.length > 0) {
    await Promise.all(
      product.images.map(async (img) => {
        await cloudinary.uploader.destroy(img.public_id);
      })
    );
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    data: {id}
  });
 });

export const updateProduct = asyncHandler(async (req, res, next) => {
  const { title, description, stock, category, price } = req.body;
  const { id } = req.params;

  console.log("Req body", req.body)
  console.log("Req user", req.user)
  console.log("Req files", req.files)

  // console.log("Step 1")
  const product = await Product.findById(id)
  if (!product) {
    return next(new ErrorHandler("Product not found",404))
  }
    // console.log("Step 2")

  // if (product.seller.toString() !== req.user._id.toString()) {
  //   return next(new ErrorHandler("Not authorized to update the product", 403))
  // }

  if (title) product.title = title;
  if (description) product.description = description;
  if (price !== undefined) product.price = Number(price);
  if (stock !== undefined) product.stock = Number(stock);
  if (category) product.category = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

    // console.log("Step 3")
  if(req.files && req.files.images){
    const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images]

    if (product.images && product.images.length > 0) {
      await Promise.all(product.images.map(async (img) => {
        await cloudinary.uploader.destroy(img.public_id)
      }))
    }

    const images = await Promise.all(
      files.map(async (file) => {
    const result =  await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "product_images"
        });
        return {
          public_id: result.public_id,
          url: result.secure_url
        }
      })
    )
    product.images = images;
  }

  // console.log("Step 4")

  try {

    await product.save();
  } catch (error) {
    console.log("Error saving the product", error)
    return next(new ErrorHandler(error.message, 400))
  }

    // console.log("Step 5")
  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: {product},
  })
})

export const getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorHandler("Product not found",404))
  }

  res.status(200).json(product)
})

