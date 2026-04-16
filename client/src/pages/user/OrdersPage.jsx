import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../store/slices/order.slice';
import { useNavigate } from "react-router-dom"

"Pending", "Paid", "Processing", "Shipped", "Delivered", "Cancelled"

const divColor = (category) => {
  switch (category) {
    case "Pending":
      return "bg-gradient-to-l from-white via-yellow-300 shadow-lg"
      break;
    case "Paid":
      return "bg-gradient-to-l from-white via-blue-300 shadow-lg"
      break;
    case "Processing":
      return "bg-gradient-to-l from-white via-purple-300 shadow-lg"
      break;
    case "Shipped":
      return "bg-gradient-to-l from-white via-pink-300 shadow-lg"
      break;
    case "Delivered":
      return "bg-gradient-to-l from-white via-green-300 shadow-lg"
      break;
    case "Cancelled":
      return "bg-gradient-to-l from-white via-red-300 shadow-lg"
      break;

    default:
      return "bg-slate-300 "
      break;
  }
}

const textColor = (category) => {
  switch (category) {
    case "Pending":
       return "text-yellow-500"
      break;
    case "Paid":
       return "text-blue-500"
      break;
    case "Processing":
       return "text-pruple-500"
      break;
    case "Shipped":
       return "text-pink-500"
      break;
    case "Delivered":
       return "text-green-500"
      break;
    case "Cancelled":
       return "text-red-500"
      break;

    default:
      break;
  }
}


const OrdersPage = () => {


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {orders} = useSelector(state => state.order)

  useEffect(() => {
   dispatch(getOrders())
  },[])

  console.log(orders)
  return (
    <div className='bg-white/50 min-h-screen p-6'>

      <h3 className='text-2xl md:text-4xl font-semibold mb-4'>Orders</h3>

      <hr />


      {
        (orders || []).map((order) => (
          <div className={`${divColor(order?.status)} mt-4 p-6 rounded-lg relative`}
          key={order._id}
          >
        <div className="flex gap-2">
          <div>
            <img src={order.orderItems?.[0]?.product?.images?.[0]?.url} alt="" className='size-13 h-16 rounded' />
        </div>
          <div>
            <h3 className={`${textColor(order?.status)} text-sm font-semibold`}>{order.orderItems?.[0]?.product?.title || "Porduct Name"} </h3>
            <h3 className={`${textColor(order?.status)} text-xs`}>{order?.orderItems?.[0]?.product?.description} </h3>
         </div>
            </div>
            <div className="flex items-center justify-between  mt-2">
              <p className={`${textColor(order?.status)} text-xs border p-0.5 rounded`}>quantity: {order?.orderItems?.[0]?.quantity }</p>
              <p className={`${textColor(order?.status)} text-xs  p-0.5 mt-2 rounded`}> {order?.createdAt.split("T")[0] }</p>
            </div>

            <div className={`${textColor(order?.status)} text-xs border inline-flex px-0.5 rounded absolute top-2 right-2`}>
              { order?.status}
            </div>
       </div>

        ))

      }

      {
        orders.length === 0 && (
          <div className=" px-2 flex flex-col items-center justify-center h-screen">
            <p className='text-lg font-semibold'>No orders yet.</p>
            <p
              className='text-blue-500 underline'
              onClick={()=> navigate("/user/products")}
            >Continue Shopping</p>
          </div>
        )
      }


    </div>
  )
}

export default OrdersPage
