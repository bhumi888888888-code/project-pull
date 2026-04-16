import express from "express";
import { createCheckoutSession } from "../controllers/payment.controller.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { getOrders } from "../controllers/order.controller.js";

const router = express.Router();

router.get(
  "/get",
  isAuthenticated,
  getOrders
)

export default router;
