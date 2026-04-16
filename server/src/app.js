import express from "express";
import { ENV } from "./lib/ENV.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ErrorMiddleware } from "./middlewares/errorHandler.js";
import fileUpload from "express-fileupload";
import stripe from "./config/stripe.js";
// Routes
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import orderRoutes from "./routes/order.route.js";
import cartRoutes from "./routes/cart.route.js";
import paymentRoutes from "./routes/payement.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
import Order from "./models/orders.model.js";
import Product from "./models/product.model.js";
import sendMail from "./services/sendMail.js";
import Notification from "./models/notification.model.js";

const app = express();


// app.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {


//   console.log("webhook hit")
//   let event = request.body;
//   // Only verify the event if you have an endpoint secret defined.
//   // Otherwise use the basic event deserialized with JSON.parse
//   if ("whsec_87a7bb1b322acb50d98a7f54198092a9d8690a1d027affbdc22dddcdca7fc3fd") {
//     // Get the signature sent by Stripe
//     const signature = request.headers['stripe-signature'];
//     try {
//       event = stripe.webhooks.constructEvent(
//         request.body,
//         signature,
//         "whsec_87a7bb1b322acb50d98a7f54198092a9d8690a1d027affbdc22dddcdca7fc3fd"
//       );


//   console.log("Event Type:", event.type);

//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object;

//       console.log("session:",session)
//       console.log("metadata:",session.metadata)

//     if (!session.metadata) {
//       console.log("No Metadata");
//       return response.sendStatus(200);
//     }

//     const { productId, userId, quantity } = session.metadata;

//     const product = await Product.findById(productId)
//     //create order
//     await Order.create({
//       user: userId,
//       orderItems: [
//         {
//           product: productId,
//           quantity,
//           price:product.price,
//         }
//       ],
//       totalAmount: session.amount_total / 100,
//       status: "Paid",
//       shippingAddress: {
//         fullName: metadata.fullName,
//         phone: metadata.phone,
//         addressLine1: metadata.addressLine1,
//         city: metadata.city,
//         state: metadata.state,
//         postalCode: metadata.postalCode,
//       },
//       payment: {
//         method: "Stripe",
//         status: "Success",
//         stripeSessionId: session.id,
//         stripePaymentIntentId: session.payment_intent,
//         amount: session.amount_total / 100,
//         currency: session.currency,
//         paidAt: new Date(),

//       }
//     });

//     //reduce stock
//     await Product.findByIdAndUpdate(productId, {
//       $inc: {stock: -quantity},
//     })



//   }

//   // Handle the event
//   // switch (event.type) {
//   //   case 'payment_intent.succeeded':
//   //     const paymentIntent = event.data.object;
//   //     console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
//   //     // Then define and call a method to handle the successful payment intent.
//   //     // handlePaymentIntentSucceeded(paymentIntent);
//   //     break;
//   //   case 'payment_method.attached':
//   //     const paymentMethod = event.data.object;
//   //     // Then define and call a method to handle the successful attachment of a PaymentMethod.
//   //     // handlePaymentMethodAttached(paymentMethod);
//   //     break;
//   //   default:
//   //     // Unexpected event type
//   //     console.log(`Unhandled event type ${event.type}.`);
//   // }

//       // Return a 200 response to acknowledge receipt of the event

//       console.log("Order Created")
//   response.send();
//     } catch (err) {
//       console.log(`⚠️  Webhook signature verification failed.`, err.message);
//       return response.sendStatus(400);
//     }
//   }

// });

app.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
  const sig = request.headers['stripe-signature'];
  const endpointSecret = "whsec_87a7bb1b322acb50d98a7f54198092a9d8690a1d027affbdc22dddcdca7fc3fd";

  let event;

  try {
    // request.body MUST be the raw Buffer here
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    console.error(`❌ Webhook Error: ${err.message}`);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Use the metadata you passed during session creation
    const { productId, userId, quantity, fullName, phone, addressLine1, city, state, postalCode } = session.metadata;

    try {
      const product = await Product.findById(productId);

      await Order.create({
        user: userId,
        orderItems: [{
          product: productId,
          quantity: parseInt(quantity),
          price: product.price,
        }],
        totalAmount: session.amount_total / 100,
        status: "Paid",
        shippingAddress: {
          fullName,
          phone,
          addressLine1,
          city,
          state,
          postalCode,
        },
        payment: {
          method: "Stripe",
          status: "Success",
          stripeSessionId: session.id,
          stripePaymentIntentId: session.payment_intent,
          amount: session.amount_total / 100,
          currency: session.currency,
          paidAt: new Date(),
        }
      });

      await Product.findByIdAndUpdate(productId, {
        $inc: { stock: -parseInt(quantity) },
      });


// priority,type,isRead,message,user
     await Notification.create({
    user: userId, // Use userId from metadata, NOT req.user._id
    type: "order",
    priority: "medium",
    message: "Order created successfully"
  });

      const User = mongoose.model("User");
      const buyer = await User.findById(userId);

      if (buyer) {
    await sendMail({
      to: buyer.email, // Use the email from the database
      subject: "Order Confirmation",
      message: htmlContent
    });
  }

console.log("✅ Order and Notification Created Successfully");
    } catch (dbErr) {
      console.error("❌ Database Error during webhook:", dbErr);
      // Return 500 so Stripe retries later
      return response.status(500).send("Internal Server Error");
    }
  }

  response.json({ received: true });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: [ENV.FRONTEND_URL],
  methods: ["POST", "PUT", "PATCH", "DELETE", "GET"],
  credentials: true
}));
app.use(
  fileUpload({
    tempFileDir: "./tmp/" ,
    useTempFiles: true
  })
)

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/notification", notificationRoutes);
app.use("/api/v1/post", postRoutes);


app.use(ErrorMiddleware)
export default app;
