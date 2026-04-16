import express from "express";
import { editProfile, getUser, login, logout, register } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", isAuthenticated, getUser);
router.get("/logout", isAuthenticated, logout);
router.put("/update", isAuthenticated, editProfile);

export default router;
