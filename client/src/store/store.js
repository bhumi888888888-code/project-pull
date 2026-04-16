import { configureStore } from "@reduxjs/toolkit"
import authReducers from "./slices/auth.slice"
import popupReducers from "./slices/popup.slice"
import sellerReducers from "./slices/seller.slice"
import productReducers from "./slices/product.slice"
import cartReducers from "./slices/cart.slice"
import wishlistReducers from "./slices/wishlist.slice"
import orderReducers from "./slices/order.slice"
import notificationReducers from "./slices/notification.slice"
import postReducers from "./slices/post.slice"

export const store = configureStore({
  reducer: {
    auth: authReducers,
    popup: popupReducers,
    seller: sellerReducers,
    product: productReducers,
    cart: cartReducers,
    wishlist: wishlistReducers,
    order: orderReducers,
    notification: notificationReducers,
    post: postReducers,
  }

})

