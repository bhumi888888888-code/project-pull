import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axios";
import { toast } from "react-toastify";

export const register = createAsyncThunk("register", async (data, thunkAPI) => {
  try {
    const res = await axiosInstance.post("/auth/register", data);
    toast.success(res?.data?.message || "User register successfully");
    return res?.data?.user || res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to register user");
    return thunkAPI.rejectWithValue(error?.response?.data?.message);
  }
});

export const login = createAsyncThunk("login", async (data, thunkAPI) => {
  try {
    const res = await axiosInstance.post("/auth/login", data);
    toast.success(res?.data?.message || "User logged in successfully");
    return res?.data?.user || res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to login the user");
    return thunkAPI.rejectWithValue(error?.response?.data?.message);
  }
});

export const getUser = createAsyncThunk("getUser", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/auth/me")
    return res?.data?.user || res?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data?.message)
  }
})

export const logout = createAsyncThunk("logout", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/auth/logout");
    toast.success(res?.data?.message || "User logged out successfully")
  } catch (error) {
    toast.error(error?.response?.data?.message || "User logged out successfully")
    return thunkAPI.rejectWithValue(error?.response?.data?.message)
  }
})

export const editProfile = createAsyncThunk("editProfile", async (formData, thunkAPI) => {
  try {
    const res = await axiosInstance.put("/auth/update", formData );
   toast.success(res?.data?.message || "Profile updated successfully")
    return res?.data?.user;
  } catch (error) {
  toast.error(error?.response?.data?.message || "Failed to update profile")
    return thunkAPI.rejectWithValue(error?.response?.data?.message);
  }
})


const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    loading: false,
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload?.user || action.payload;
        state.isAuthenticated = true
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload?.user || action.payload;
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
      state.isAuthenticated = true
      state.authUser = action.payload?.user || action.payload
      })
      .addCase(getUser.rejected, (state) => {
        state.isAuthenticated = false;
        state.authUser = null;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = null;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      })
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload;
      })
      .addCase(editProfile.rejected, (state) => {
        state.loading = false;
    })
  },
});

export default authSlice.reducer;
