import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { deleteNotification, getNotification, markAsRead } from "../controllers/notification.controller.js";

const router = express.Router();

router.get(
  "/",
  isAuthenticated,
  getNotification,
)

router.delete(
  "/delete/:id",
  isAuthenticated,
  deleteNotification,
)

router.put(
  "/mark-as-read",
  isAuthenticated,
  markAsRead,
)

export default router;
