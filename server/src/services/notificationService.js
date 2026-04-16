import ErrorHandler from "../middlewares/errorHandler.js"
import Notification from "../models/notification.model.js"

export const markAsRead = async (notificationId, userId) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: notificationId, user: userId },
    {$set :{isRead: true }},
    { returnDocument: 'after' },
  )


  // console.log(notificationId)
  return notification;
}
