import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: Number,
      price: Number,
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["Pending","Paid", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending"
  },

  shippingAddress: {
    fullName: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    addressLine1: {
      type: String,
      required: true
    },
    addressLine2: String,
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      default: "India",
    },
  },

  payment: {
    method: {
      type: String,
      enum: ["COD", "Razorpay", "Stripe"],
      default: "COD",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Success", "Failed", "Refunded"],
      default: "Pending"
    },
    transactionId: String,

    stripeSessionId: String,
    stripePaymentIntentId: String,
    orderId: String,
    signature: String,
    amount: Number,
    currency: {
      type: String,
      default: "USD"
    },
    paidAt: Date,
    failureReason: String,
  },


 }
,{timestamps:true})

orderSchema.index({ user: 1 });
orderSchema.index({ "payment_status": 1 });

const Order = mongoose.model("Order", orderSchema);
export default Order;
