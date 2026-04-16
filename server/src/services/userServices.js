import ErrorHandler from "../middlewares/errorHandler.js";
import User from "../models/user.model.js";

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  return user;
};
