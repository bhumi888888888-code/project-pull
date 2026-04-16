import cloudinary from "../config/cloudinary.js";
import { ENV } from "../lib/ENV.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import User from "../models/user.model.js";
import { generateToken } from "../services/tokenService.js";
import * as userServices from "../services/userServices.js"

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("User already exists", 400));
  }

  if (password.length < 8) {
    return next(
      new ErrorHandler("Password must be at least 8 characters", 400),
    );
  }

  if (password.length > 128) {
    return next(new ErrorHandler("Password cannot exceed 128 characters", 400));
  }

  const userInfo = {
    name,
    email,
    password,
    role,
  }

  const user = await User.create(userInfo);

   await  generateToken(res, user);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user,
  })

});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("All fields are required", 400))
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid credentials",400))
  }

  const isPasswordMatch = await user.comparePassword(password)
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid credentials",400))
  }

  await generateToken(res, user)

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    user,
  })
})

export const getUser = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const user = await User.findById(userId)
  res.status(200).json({
    success: true,
    user,
  })
})

export const logout = asyncHandler(async (req, res, next) => {

  const refreshToken = req.cookies?.refreshToken;

  if (refreshToken) {
    req.user.refreshTokens = req.user.refreshTokens.filter(
      token => token !== refreshToken
    )
  }
  req.user.tokenVersion += 1;
  await req.user.save()

  res.status(200).cookie("refreshToken", null, {
    expires: new Date(0),
    httpOnly: true,
    sameSite: "strict",
    secure: ENV.NODE_ENV === "production",
  }).json({
    success: true,
    message: "User logged out successfully"
  })
})

export const editProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { name } = req.body;
  const profilePic = req.files?.profilePic;

  console.log("File received:", profilePic)

  if (!name) {
    return next(new ErrorHandler("Name is required.",400))
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found",404))
  }

  if(name) user.name = name;
  if (profilePic) {
    const uploadResult = await cloudinary.uploader.upload(profilePic.tempFilePath);

    user.profilePic = uploadResult.secure_url;

  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  })

})
