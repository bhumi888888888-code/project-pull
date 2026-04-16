import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axios";
import { toast } from "react-toastify";

export const toggleWishlist = createAsyncThunk("addToWishlist", async (id, thunkAPI) => {
  try {
    const res = await axiosInstance.put("/product/wishlist/add", { productId:id });
    toast.success(res?.data?.message || "Added to wishllist");
    return res?.data?.data?.wishlist;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to add to wishlist");
    return thunkAPI.rejectWithValue(error?.response?.data?.message)
  }
})


const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    loading: false,
    wishlist: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        state.loading = false;
        // state.wishlist = action.payload;
        state.wishlist = (action.payload || []).map(item => item?._id ? item._id : item);
      })
      .addCase(toggleWishlist.rejected, (state) => {
        state.loading = false;
    })
  }
})

export default wishlistSlice.reducer;
