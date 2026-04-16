import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/authMiddleware.js";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller.js";
import { addToWishlist } from "../controllers/wishlist.controller.js";


const router = express.Router();

router.post(
  "/create-product",
  isAuthenticated,
  isAuthorized("Seller"),
  createProduct
)

router.get(
  "/",
  isAuthenticated,
  getProducts
)

router.delete(
  "/delete/:id",
  isAuthenticated,
  isAuthorized("Seller"),
  deleteProduct,
)

router.put(
  "/update/:id",
  isAuthenticated,
  isAuthorized("Seller"),
  updateProduct,
)

router.get(
  "/get/:id",
  getProduct
)

router.put(
  "/wishlist/add",
  isAuthenticated,
  addToWishlist,
)

export default router;
