import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axios";
import { toast } from "react-toastify";
import axios from "axios";

export const createPost = createAsyncThunk("createPost ", async (data, thunkAPI) => {
  try {
    const formData = new FormData();
    formData.append("text", data.text)
    formData.append("videos", data.videos)
    const res = await axiosInstance.post("/post/create", formData);
    toast.success(res?.data?.message || "Post created successfully")
    return res?.data?.post;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to upload post")
    return thunkAPI.rejectWithValue(error?.response?.data?.message)
  }
})

export const getPosts = createAsyncThunk("getPosts", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/post/");
    return res?.data?.posts;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to fetch posts");
    return thunkAPI.rejectWithValue(error?.response?.data?.message);
  }
})

export const likePost = createAsyncThunk("likePost", async(postId, thunkAPI) => {
 try {
   const res = await axiosInstance.put("/post/like", postId);
   toast.success(res?.data?.message)
   return res?.data;
 } catch (error) {
  toast.error(error?.response?.data?.message || "Failed to like post")
  return thunkAPI.rejectWithValue(error?.response?.data?.message)
 }
})

export const deletePost = createAsyncThunk("deletePost", async (id, thunkAPI) => {
  try {
    const res = await axiosInstance.delete(`/post/delete/${id}`)
    toast.success(res?.data?.message || "Post deleted succcessfully")
    return res?.data?.id;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to delete post");
    return thunkAPI.rejectWithValue(error?.response?.data?.message)
  }
})

const postSlice = createSlice({
  name: "post",
  initialState: {
    loading: false,
    posts: [],
    isLiked: false,
    likesCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state) => {
        state.loading = false;
      })
    .addCase(getPosts.pending, (state) => {
      state.loading = true;
    })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter(p => p._id !== action.payload);
      })
      .addCase(deletePost.rejected, (state) => {
        state.loading = false;
      })
      .addCase(likePost.pending, (state) => {
        state.loading = true;
      })
    .addCase(likePost.fulfilled, (state, action)=> {
      state.loading = false;
      state.isLiked = action.payload.isLiked;
      state.likesCount = action.payload.likesCount;
    })
      .addCase(likePost.rejected, (state) => {
        state.loading = false;
    })

  }
})

export default postSlice.reducer;
