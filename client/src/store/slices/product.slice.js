import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axios";
import { toast } from "react-toastify";
import axios from "axios";

export const getProducts = createAsyncThunk("getProducts", async (category, thunkAPI) => {
  const url = category ? `/product?category=${category}` : '/product'
  try {
  const res = await axiosInstance.get(url);
  return res?.data?.data?.products || res?.data?.data || res?.data;
  } catch (error) {
  toast.error(error?.response?.data?.message || "Failed to fetch products")
  return thunkAPI.rejectWithValue(error?.response?.data?.message)
  }
})

export const deleteProduct = createAsyncThunk("deleteProduct", async (id, thunkAPI) => {
  try {
    const res = await axiosInstance.delete(`/product/delete/${id}`);
    toast.success(res?.data?.message || "Product deleted successfully")
    return id;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to delete product")
    return thunkAPI.rejectWithValue(error?.response?.data?.message)
  }
})

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

export const fetchProduct = createAsyncThunk("fetchProduct", async (id, thunkAPI) => {
  try {
    const res = await axios.get(`/product/get/${id}`);
    return res?.data?.product;
  } catch (error) {
   toast.error(error?.response?.data?.message || "Failed to fetch product")
   return thunkAPI.rejectWithValue(error?.response?.data?.message)
  }
})



const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    products: [],
    files: [],
    product: null,
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload?.products || action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(p => p._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.loading = false;
      })
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
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.loading = false;
      })
  },

})

export default productSlice.reducer;

