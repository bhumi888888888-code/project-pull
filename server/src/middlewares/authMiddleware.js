import jwt from "jsonwebtoken";
import ErrorHandler from "./errorHandler.js";
import { ENV } from "../lib/ENV.js";
import User from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {

  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return next(new ErrorHandler("Unauthorized, Please login to access this resource",401))
    }

    // console.log("TOKEN:", token);

  const decoded = jwt.verify(token, ENV.JWT_ACCESS_SECRET)
  if (!decoded) {
    return next(new ErrorHandler("Unauthorized: Invalid Token",401))
  }

  const user = await User.findById(decoded._id);
    if (!user) {
    return next(new ErrorHandler("User not found", 401))
    }

    if (decoded.tokenVersion !== user.tokenVersion) {
      return next(new ErrorHandler("Token revoked", 401))
    }

    req.user = user;

  next()
  } catch (error) {
    return next(new ErrorHandler("Invalid Or expired token",401))
  }

}

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
     if (!req.user || !roles.includes(req.user.role)) {
    return next(new ErrorHandler(`not authorized to access this resource`,403))
  }
  next()
  }

}
