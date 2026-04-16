import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import * as notificationServices from "../services/notificationService.js"

export const getNotification = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found",404))
  }

  const notifications = await Notification.find({ user: userId }).sort({createdAt: -1});
  // if (!notifications) {
  //   return next(new ErrorHandler("No notifications found",404))
  // }

  res.status(200).json({
    success: true,
    notifications
  })

})

export const markAsRead = asyncHandler(async (req, res, next) => {
  const { id } = req.body;

  const notification = await notificationServices.markAsRead(id, req.user._id);
  if (!notification) {
    return next(new ErrorHandler("Notification not found",404))
  }

  // notification.isRead = true;

  // await notification.save();

  res.status(200).json({
    success: true,
    message: "Notification mark as read",
    notification,
  })

})

export const deleteNotification = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

    console.log(id)
  const notification = await Notification.findById(id);
  if (!notification) {
    return next(new ErrorHandler("Notification not found",404))
  }
  console.log(id, notification)

  await notification.deleteOne();

  res.status(200).json({
    success: true,
    message: "Notification deleted successfully",
    id,
  })
})
