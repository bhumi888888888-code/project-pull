import mongoose from "mongoose";

const cartItemsSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  priceAtAdd: Number,
  title: String,
  image: String,
})

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [cartItemsSchema]

}, { timestamps: true })

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
