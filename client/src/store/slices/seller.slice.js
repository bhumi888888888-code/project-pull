import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axios";
import { toast } from "react-toastify";
import axios from "axios";


export const createProduct = createAsyncThunk("createProduct", async (data, thunkAPI) => {
  try {
    const res = await axiosInstance.post("/product/create-product", data, {
      headers: {
        "Content-Type" : "multipart/form-data"
      }
    });
    toast.success(res?.data?.message || "Product created successfully");
    return res?.data?.data?.product || res?.data?.data || res?.data;
  } catch (error) {
    console.log("CREATE ERROR",error)
    console.log("CREATE DATA ERROR", error?.response?.data)
    toast.error(error?.response?.data?.message || "Failed to created product")
    return thunkAPI.rejectWithValue(error?.response?.data?.message);
  }
})

export const updateProduct = createAsyncThunk("updateProduct", async ({ id, data }, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("stock", data.stock)
    formData.append("category", data.category)
    formData.append("price", data.price)

    if (data.images) {
      data.images.forEach(file => {
        formData.append("images", file)
      })
    }

    const res = await axiosInstance.put(`/product/update/${id}`, formData)
    toast.success(res?.data?.message || "Product updated successfully")
    return res?.data?.data?.product;
  } catch (error) {
    console.log("Update error",error)
    console.log(error.message)
    toast.error(error?.response?.data?.message || "Failed to update product")
    return thunkAPI.rejectWithValue(error?.response?.data?.message)
  }
})

const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    loading: false,
    products: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map(p => p._id === action.payload._id ? action.payload : p)
    })
  },
})

export default sellerSlice.reducer;
