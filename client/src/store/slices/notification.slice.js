import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axios";
import { toast } from "react-toastify";

export const getNotifications = createAsyncThunk("getNotifications", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/notification/");
    return res?.data?.notifications;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to fetch notifications")
    return thunkAPI.rejectWithValue(error?.response?.data?.message)
  }
})

export const markAsRead = createAsyncThunk("markAsRead", async (id, thunkAPI) => {
  try {
    const res = await axiosInstance.put("/notification/mark-as-read", { id });
    toast.success(res?.data?.message)
    return res?.data?.id;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to mark as read");
    return thunkAPI.rejectWithValue(error?.response?.data?.message);
  }
})

export const deleteNotification = createAsyncThunk("deleteNotification", async (id, thunkAPI) => {
  try {
    console.log(id)
    const res = await axiosInstance.delete(`/notification/delete/${id}`, );
    toast.success(res?.data?.message);
    return res?.data?.id;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to delete notification");
    return thunkAPI.rejectWithValue(error?.response?.data?.message);
  }
})

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    loading: false,
    notifications: [],
    unReadCount: 0,
    readCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(getNotifications.rejected, (state) => {
        state.loading = false;
      })
      .addCase(markAsRead.pending, (state) => {
        state.loading = true;
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = state.notifications.map((n) => n._id === action.payload ? { ...n, isRead: true } : n);
        state.unReadCount = Math.max(state.unReadCount - 1);
        state.readCount = Math.max(state.readCount + 1);
      })
    .addCase(markAsRead.rejected, (state)=> {
      state.loading = false;
    })
      .addCase(deleteNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = state.notifications.filter(n => n._id !== action.payload)
      })
      .addCase(deleteNotification.rejected, (state) => {
        state.loading = false;
    })
  },
})

export default notificationSlice.reducer;
