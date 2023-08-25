import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./mainSlice";

export const postComment = createAsyncThunk(
  "/blog/comment",
  async (body, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const res = await axiosClient.post("/blog/comment", body);
      return res.result;
    } catch (error) {
      console.log(error);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  }
);

export const likeBlog = createAsyncThunk(
  "blog/like",
  async (body, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const res = await axiosClient.post("blog/like", body);
      return res.result;
    } catch (error) {
      console.log(error);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  }
);

export const unLikeBlog = createAsyncThunk(
  "blog/unLike",
  async (body, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const res = await axiosClient.post("blog/unLike", body);
      return res.result;
    } catch (error) {
      console.log(error);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  }
);

export const getCategoryPopularBlogs = createAsyncThunk(
  "/category/popular",
  async (body, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const res = await axiosClient.get("/category/popular", {
        params: { category: body },
      });
      return res.result;
    } catch (error) {
      console.log(error);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  }
);

export const getBlogData = createAsyncThunk("/blog", async (body, thunkApi) => {
  try {
    thunkApi.dispatch(setLoading(true));
    const res = await axiosClient.get("/blog", { params: { blogId: body } });
    return res.result;
  } catch (error) {
    console.log(error);
  } finally {
    thunkApi.dispatch(setLoading(false));
  }
});

const blogSlice = createSlice({
  name: "blogSlice",
  initialState: {
    blogData: {},
    popular: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBlogData.fulfilled, (state, action) => {
      state.blogData = action.payload;
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      state.blogData.comments.push(action.payload);
    });
    builder.addCase(likeBlog.fulfilled, (state, action) => {
      state.blogData = action.payload;
    });
    builder.addCase(unLikeBlog.fulfilled, (state, action) => {
      state.blogData = action.payload;
    });
    builder.addCase(getCategoryPopularBlogs.fulfilled, (state, action) => {
      state.popular = action.payload;
    });
  },
});

export default blogSlice.reducer;
