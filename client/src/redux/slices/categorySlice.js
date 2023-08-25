import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./mainSlice";

export const getCategoryBlogs = createAsyncThunk(
  "/category/latest",
  async (body, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const res = await axiosClient.get("/category/latest", {
        params: { page: body.page, limit: 4, category: body.category },
      });
      return res.result;
    } catch (error) {
      console.log(error);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  }
);

const categorySlice = createSlice({
  name: "categorySlice",
  initialState: {
    blogs: [],
    page: 1,
  },
  reducers: {
    incrementPage: (state, action) => {
      state.page++;
    },
    decrementPage: (state, action) => {
      state.page--;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategoryBlogs.fulfilled, (state, action) => {
      state.blogs = action.payload;
    });
  },
});

export default categorySlice.reducer;
export const { incrementPage, decrementPage } = categorySlice.actions;
