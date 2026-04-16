import { MessageCircle } from 'lucide-react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNotification, getNotifications, markAsRead } from '../store/slices/notification.slice';

const priorityColor = (priority) => {
  switch (priority) {
    case "low":
        return "bg-green-100 text-green-500"
      break;
    case "medium":
        return "bg-yellow-100 text-yellow-500"
      break;
    case "high":
        return "bg-red-100 text-red-500"
      break;

    default:
      return "bg-slate-300"
      break;
  }
}
      // "order",
      // "limited-edition-drop",
      // "system",
      // "general",
const typeColor = (type) => {
switch (type) {
  case "order":
      return " bg-blue-100 text-blue-600 "
    break;
  case "limited-edition-drop":
      return "bg-red-100 text-red-600 "
    break;
  case "system":
      return " bg-gray-100 text-gray-600 "
    break;
  case "general":
      return "bg-purple-100 text-purple-600 "
    break;

  default:
    break;
}
}

const divColor = (type) => {
  switch (type) {
    case "low":
        return "bg-green-100/50 border border-green-100 shadow-sm "
      break;
    case "medium":
        return "bg-yellow-100/50 border border-yellow-100 shadow-sm  "
      break;
    case "high":
        return "bg-red-100/50 border border-red-100 shadow-sm  "
      break;

    default:
      return "bg-slate-300"
      break;
  }
}

const Notifications = () => {

  const dispatch = useDispatch();

  const { notifications } = useSelector(state => state.notification);

  useEffect(() => {
    dispatch(getNotifications())
    console.log(notifications)
  }, [dispatch])

  useEffect(() => {
    console.log(notifications)
  },[notifications])

  const markRead = (id) => {
    console.log(id)
    dispatch(markAsRead(id))
  }

  const handleDelete = (id) => {
    dispatch(deleteNotification(id))
  }

  return (
    <div className='bg-primary min-h-screen p-4'>
   <h3 className='text-2xl md:text-4xl font-semibold'>Notifications</h3>

      <hr className='my-4' />

       {/* <div
            className='bg-blue-100 rounded-lg p-4'
          >
            <div className='flex items-center gap-2 justify-end'>
          <p className='text-sm text-slate-500'>{"12/05/29"}</p>
          <p
            className="text-sm bg-green-100 rounded-full  px-2 text-green-500 font-semibold"
          >
           Low
          </p>
        </div>
        <div className='flex gap-3'>
          <MessageCircle className="text-blue-500" />
          <h4>Order placed successfully</h4>
        </div>

        <div className="flex items-center justify-between mt-2 ">
            <span className='text-sm ml-8 bg-blue-200 px-2 text-blue-700 border border-blue-100 rounded-full'>
              Feedback
          </span>

          <div className='flex items-center gap-2'>
            <button
              className='text-blue-500'
              // onClick={()=> }
            >Mark as Read</button>
            <button className='text-red-500'>Delete</button>
          </div>

        </div>
         </div> */}

      {
        (notifications || []).map((notification) =>(
       <div
         className={`${divColor(notification?.priority)}rounded-lg p-4 mt-4`}
         key={notification._id}
          >
            <div className='flex items-center gap-2 justify-end'>
          <p className='text-sm text-slate-500'>{notification?.createdAt.split("T")[0] || "12/05/29"}</p>
          <p
            className={`text-sm ${priorityColor(notification?.priority)} rounded-full  px-2 font-semibold`}
          >
           {notification?.priority}
          </p>
        </div>
        <div className='flex gap-3'>
              <MessageCircle className={`${notification?.priority === "low" ?
                 " text-green-500" :
                 notification?.priority === "medium" ?
                 "text-yellow-500" :
                 "text-red-500"}`}
               />
              <h4 className={`text-slate-500`}>{ notification?.message}</h4>
        </div>

        <div className="flex items-center justify-between mt-2 ">
            <span className={`text-sm ml-8 rounded-full px-1 ${typeColor(notification?.type)}`}>
              {notification?.type}
          </span>

          <div className='flex items-center gap-2'>
            <button
              className={`text-blue-500 ${notification?.isRead ? "hidden": "block"}`}
              onClick={() => markRead(notification?._id)}
            >Mark as Read</button>
                <button className='text-red-500'
                onClick={() => handleDelete(notification?._id)}
                >Delete</button>
          </div>

        </div>
         </div>

        ))

      }

      {/* {notifications.length === 0 && (
        <div >
          <p className='text-md'>No Notifications yet.</p>
        </div>
      )} */}
    </div>
  )
}

export default Notifications;
