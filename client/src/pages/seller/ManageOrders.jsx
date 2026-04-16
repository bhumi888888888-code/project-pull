import { Ban, Check, Clock, Clipboard , Ship, Workflow } from 'lucide-react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

"Pending", "Processing", "Shipped", "Delivered", "Cancelled"

const statusDiv = (status) => {
  switch (status) {
    case "Pending":
        return " bg-gradient-to-r to-yellow-100/50 border  border-yellow-200"
      break;

    case "Processing":
      return " bg-gradient-to-r to-blue-100/50 border border-blue-200"
     break;

    case "Shipped":
      return" bg-gradient-to-r to-purple-100/50 border border-purple-200"
     break;

    case "Delivered":
      return " bg-gradient-to-r to-green-100/50 border border-green-200"
     break;

    case "Cancelled":
      return " bg-gradient-to-r to-red-100/50 border border-red-200"
     break;

    default:
      return "bg-white "
      break;
  }
}

const statusText = (status) => {
  switch (status) {
    case "Pending":
      return "text-yellow-500"
      break;

    case "Processing":
     return "text-blue-500"
      break;

    case "Shipped":
     return "text-purple-500"
      break;

    case "Delivered":
     return "text-green-500"
      break;

    case "Cancelled":
     return "text-red-500"
      break;

    default:
      return "text-black"
      break;
  }
}

const statusGradientText = (status) => {
  switch (status) {
    case "Pending":
      return "bg-clip-text text-transparent bg-linear-to-br from-white via-yellow-500 via-yellow-400 to-yellow-500"
      break;

    case "Processing":
     return "bg-clip-text text-transparent bg-linear-to-br from-white via-blue-500 via-blue-400 to-blue-500"
      break;

    case "Shipped":
      return "bg-clip-text text-transparent bg-linear-to-br from-white via-purple-500 via-purple-400 to-purple-500"
      break;

    case "Delivered":
      return "bg-clip-text text-transparent bg-linear-to-br from-white via-green-500 via-green-400 to-green-500"
      break;

    case "Cancelled":
      return "bg-clip-text text-transparent bg-linear-to-br from-white via-red-500 via-red-400 to-red-500"
      break;

    default:
      return "text-black"
      break;
  }
}

const statusTag = (status) => {
  switch (status) {
    case "Pending":
     return "bg-yellow-100 border border-yellow-300 text-yellow-500"
      break;
    case "Processing":
     return "bg-blue-100 border border-blue-300 text-blue-500"
      break;
    case "Shipped":
     return "bg-pruple-100 border border-pruple-300 text-pruple-500"
      break;
    case "Delivered":
     return "bg-green-100 border border-green-300 text-green-500"
      break;
    case "Cancelled":
     return "bg-red-100 border border-red-300 text-red-500"
      break;

    default:
      return " border border-slate-300 text-slate-500"
      break;
  }
}

const orderDivInfo = [
  {
    title: "Total Orders",
    icon: Clipboard,
    number: 450,
    iconClass: "bg-slate-200/60 text-slate-500 border border-slate-300 ",
    divContainerClass: "bg-white border border-slate-300 ",
    textColor: "text-slate-500",
    titleText: "text-slate-500",
    // number: orders.length()
  },
  {
    title: "Pending",
    icon: Clock,
    number: 450,
    iconClass: "bg-yellow-200/60 text-yellow-500 border border-yellow-300 ",
    divContainerClass: "bg-yellow-100/50 border border-yellow-300 ",
    textColor: "text-yellow-500",
     titleText: "text-yellow-500",
    // number: orders.length()
  },
  {
    title: "Processing",
    icon: Workflow,
    number: 450,
    iconClass: "bg-blue-200/60 text-blue-500 border border-blue-300 ",
    divContainerClass: "bg-blue-100/50 border border-blue-300 ",
    textColor: "text-blue-500",
    titleText: "text-blue-500",
    // number: orders.length()
  },
  {
    title: "Shipped",
    icon: Ship,
    number: 450,
    iconClass: "bg-purple-200/60 text-purple-500 border border-purple-300 ",
    divContainerClass: "bg-purple-100/50 border border-purple-300 ",
    textColor: "text-purple-500",
     titleText: "text-purple-500",
    // number: orders.length()
  },
  {
    title: "Delivered",
    icon: Check,
    number: 450,
    iconClass: "bg-green-200/60 text-green-500 border border-green-300 ",
    divContainerClass: "bg-green-100/50 border border-green-300 ",
    textColor: "text-green-500",
     titleText: "text-green-500",
    // number: orders.length()
  },
  {
    title: "Cancelled",
    icon: Ban,
    number: 450,
    iconClass: "bg-red-200/60 text-red-500 border border-red-300 ",
    divContainerClass: "bg-red-100/50 border border-red-300 ",
    textColor: "text-red-500",
    titleText: "text-red-500",
    // number: orders.length()
  },
]
const ManageOrders = () => {

  // const { orders, order , loading } = useSelector(state => state.order);
  // const dispatch = useDispatch();
  //  filter for orders by status
  const navigate = useNavigate();

  const handleNavigation = (orderId) => {
    navigate(`/order/${orderId}`)
  }
  return (
    <div className='bg-primary min-h-screen p-6 '>
      {/* Top div */}
    <div className='flex items-center justify-between'>
        <h2 className='inline-flex text-2xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-black to-black bg-clip-text text-transparent'>Orders</h2>

        <div>
          <select
          className='input md:w-36'
          >
            <option value="">Filter</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-8' >
        {orderDivInfo?.map((orderDiv, i) => (
          <div
          key={i}
            className={`${orderDiv.divContainerClass} flex items-center gap-1 shadow-lg rounded-lg p-6`}>
            <div className={`inline-flex ${orderDiv.iconClass} p-1 rounded`}>
             < orderDiv.icon />
            </div>
            <div className='flex flex-1 items-center justify-between'>
            <div className=''>
              <h3 className={`${orderDiv.titleText} text-lg font-semibold`}>{ orderDiv.title}</h3>
            </div>

              <div className={`${orderDiv.textColor} text-2xl font-semibold`}>{ orderDiv.number }</div>
              </div>
          </div>

      ))}
     </div>

      {/* list mode this down here is not list but grid mode */}

      {/* todo - make it dynamic using map and is no orders length is then */}


      <div className='grid grid-cols-1 md:grid-cols-3 '>

        <div
          className={` relative flex ${statusDiv("Processing")} rounded-lg shadow-sm p-4 gap-3 justify-between `}
        // onClick={handleNavigation(order._id)}
        >
          {/* customer details */}
        <div >
            <h3 className='text-lg font-semibold'>Customer Details </h3>
            <div className='flex flex-col mt-2 '>
            <div className='flex items-center justify-center'>
           <img src="/men.avif" alt="" className='bg-cover size-15 rounded-full shadow-lg ' />
              </div>

              <div className="mt-2">
          <p className='text-sm'>name: <span className='text-sm font-semibold'>John</span> </p>
                <p className='text-sm'>email: <span className='text-sm font-semibold'>johndoe@gmail.com</span> </p>
              </div>

              </div>
          </div>

          <div className='mr-10'>
            <h3 className={`text-lg font-semibold ${statusGradientText("Processing")}`}> # Order ID: <span className='text-sm font-semibold'>#ORD123</span></h3>
            <div className='flex items-center justify-center'>
              <img src="/women.avif" alt=""className='size-10 h-13 rounded bg-cover shadow-sm' />
            </div>

            <div className='mt-3'>
              <p className={`text-sm ${statusText("Processing")}`}>Total Items: <span className={`text-sm font-semibold ${statusText("Processing")}`}>5</span> </p>
              <p className={`text-sm ${statusText("Processing")}`}>Total Amount: <span className={`text-sm font-semibold ${statusText("Processing")}`}>$100</span> </p>
              <p className={`text-sm ${statusText("Processing")}`}>Date: <span className={`text-xs ${statusText("Processing")}`}>5-02-2023</span> </p>
            </div>
          </div>

          {/* status */}
          <div className={`flex gap-1 absolute bottom-1 right-1 px-1 py-0.5 ${statusTag("Processing")} rounded `}>
            {/* <div className={` p-2 rounded-full bg-yellow-500  `} /> */}
            <p className='text-xs'>Pending</p>
          </div>

        </div>
      </div>


    </div>
  )
}

export default ManageOrders
