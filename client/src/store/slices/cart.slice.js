import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axios";
import { toast } from "react-toastify";

export const getCart = createAsyncThunk("getCart", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/cart/");
    // console.log("Full Response", res.data)
    return res?.data?.data?.cart;
  } catch (error) {
    toast.error(error?.response?.error?.message || "Failed to fetch cart items")
    return thunkAPI.rejectWithValue(error?.response?.data?.message);
  }
})

export const addToCart = createAsyncThunk("addToCart", async ({ id, quantity }, thunkAPI) => {
  try {
    const res = await axiosInstance.post(`/cart/add`, { productId: id, quantity });
    toast.success(res?.data?.message || "Added to cart")
    return res?.data?.data?.cart;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to add to cart")
    return thunkAPI(error?.response?.data?.message);
  }
})

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    cart: {items: []},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state) => {
        state.loading = false;
    })
  }
})

export default cartSlice.reducer;
