import express from "express";
import { addToCart, getCart } from "../controllers/cart.controller.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(isAuthenticated)

router.get(
  "/",
  getCart
)

router.post(
  "/add",
  addToCart
)

export default router;
