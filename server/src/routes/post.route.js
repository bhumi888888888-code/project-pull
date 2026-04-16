import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { createPost, deletePost, getPosts, likePost } from "../controllers/post.controller.js";

const router = express.Router();

router.use(isAuthenticated)

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

router.put(
  "/like",
  isAuthenticated,
  likePost,
)

export default router;

