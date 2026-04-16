import jwt from "jsonwebtoken";
import { ENV } from "../lib/ENV.js";

export const generateToken = async (res, user) => {
  const accessToken = jwt.sign( {_id: user._id, tokenVersion: user.tokenVersion}, ENV.JWT_ACCESS_SECRET, {
     expiresIn: ENV.ACCESS_TOKEN_EXPIRES,
  })

  const refreshToken = jwt.sign({ _id: user._id }, ENV.JWT_REFRESH_SECRET, {
    expiresIn: ENV.REFRESH_TOKEN_EXPIRES
  })

  user.refreshTokens.push(refreshToken)
  await user.save();

  res.cookie("token", accessToken, {
    maxAge: 15 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: ENV.NODE_ENV === "production"
  })
    .cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: ENV.NODE_ENV === "production",
  })

}
