import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { createPost, deletePost, getPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.post(
  "/create",
  isAuthenticated,
  createPost,
)

router.get(
  "/",
  isAuthenticated,
  getPosts,
)

router.delete(
  "/delete/:id",
  isAuthenticated,
  deletePost,
)

export default router;

