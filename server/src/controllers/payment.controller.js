import stripe from "../config/stripe.js";
import { ENV } from "../lib/ENV.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/errorHandler.js";
import Product from "../models/product.model.js";

// export const createPaymentIntent = asyncHandler(async (req, res, next) => {
//   try {
//     const { productId } = req.body;

//     const product = await findById(productId);

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items:
//       Order.orderItems.map(item => ({
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name:
//             item.product.toString(),
//           },
//           unit_amount: item.price * 100
//         },
//         quantity: item.quantity,
//       })),
//     success_url: `${ENV.FRONTEND_URL}/success`,
//     cancel_url: `${ENV.FRONTEND_URL}/cancel`,
//     metadata: {
//       orderId: order._id.toString(),
//     }
//   })
//   return session;
// } catch (error) {
//   next(error)
// }
// })


export const createCheckoutSession = asyncHandler(async (req, res, next) => {

  try {

    console.log("BODY:", req.body);
    console.log("user:", req.user);

  const { productId, quantity,address } = req.body;

  const product = await Product.findById(productId);

    console.log("Product", product)
  if (!product) {
    return next(new ErrorHandler("Product not found",404))
  }
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
          },
          unit_amount: product.price * 100,
        },
        quantity: quantity || 1,
      },
    ],

    metadata: {
      userId: req.user._id.toString(),
      productId: product._id.toString(),
      quantity: quantity?.toString() || "1",
      fullName: address.fullName,
      phone: address.phone,
      addressLine1: address.addressLine1,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
    },
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/user/cart",
  });

  res.json({ url: session.url });
  } catch (error) {
   next(error)
  }
})
