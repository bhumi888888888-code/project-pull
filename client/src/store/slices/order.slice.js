import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosInstance } from "../../services/axios";
import { toast } from "react-toastify";

export const getOrders = createAsyncThunk("getOrders", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/order/get");
    toast.success(res?.data?.orders)
    return res?.data?.orders;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return thunkAPI.rejectWithValue(error?.response?.data?.message);
  }
})

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    orders: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
      state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
  }

})




export default orderSlice.reducer;
