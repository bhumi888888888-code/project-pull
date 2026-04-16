import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import Order from "../models/orders.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

export const createOrder = asyncHandler(async (req, res, next) => {
  const { orderItems ,shippingAddress , payment } = req.body;
  const userId = req.user._id;

  const user = await User.findById(userId);
  if(!user){
   return next(new ErrorHandler("User not found", 404))
  }

  if(!orderItems || orderItems.length === 0 ){
   return next(new ErrorHandler("No order items",400))
  }

  if (!shippingAddress) {
    return next(new ErrorHandler("Shipping address required",400))
  }

  let totalAmount = 0;

  const formattedItems = await Promise.all(
    orderItems.map(async (item) => {
      const product = await Product.findById(item._id);

      if (!product) {
        return next(new ErrorHandler("Product not found",404))
      }

      if (product.stock === 0) {
        return next(new ErrorHandler("Out of stock",400))
      }

      if (product.stock < item.quantity) {
        return next(new ErrorHandler(`Only ${product.stock} product units are avaiable`))
      }

      if (product.isAvailable === "false") {
        return next(new ErrorHandler("Product is not available",400))
      }

      const price = product.price;
      const quantity = item.quantity;
      totalAmount += price * quantity;

      product.unitsSold += quantity;
      product.stock -= quantity;

      return {
        product,
        price,
        quantity,
      }
    })
  )

  if (payment.method === "Stripe") {
    if (!paymentIntentId) {
      return next(new ErrorHandler("Payment not verified",400))
    }
  }

  const orderInfo = {
    user,
    orderItems: formattedItems,
    totalAmount,
    shippingAddress,
    payment: {
      method: payment?.method || "COD",
      amount: totalAmount,
    }
  }

  const order = await Order.create(orderInfo)

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    data: {order}
  })

})

export const getOrders = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const orders = await Order.find({ user: userId }).populate("orderItems.product").sort({ createdAt: -1 });

  // if (!orders) {
  //   return next(new ErrorHandler("Orders not found",404))
  // }

  res.status(200).json({
    success: true,
    orders: orders || [] ,
  })

  console.log(orders.length)

})
