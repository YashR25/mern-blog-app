import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./mainSlice";

export const addBlog = createAsyncThunk(
  "/admin/addBlog",
  async (body, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const res = await axiosClient.post("/admin/addBlog", {
        title: body.title,
        image: body.image,
        content: body.content,
        category: body.category,
      });
      return res.result;
    } catch (error) {
      console.log(error);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  }
);

export const updateBlog = createAsyncThunk(
  "/admin/updateBlog",
  async (body, thunkApi) => {
    console.log(body);
    try {
      thunkApi.dispatch(setLoading(true));
      const res = await axiosClient.put(
        "/admin/updateBlog",
        {
          title: body.title,
          image: body.image,
          content: body.content,
          category: body.category,
        },
        { params: { id: body.id } }
      );
      console.log(res);
      return res.result;
    } catch (error) {
      console.log(error);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  }
);

export const getAdminData = createAsyncThunk(
  "/admin/getAdminData",
  async (body, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const res = await axiosClient.get("/admin/getAdminData", {
        params: {
          page: body.page,
          limit: body.limit,
        },
      });
      console.log(res);
      return res.result;
    } catch (error) {
      console.log(error);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "/admin/deleteBlog",
  async (body, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const res = await axiosClient.delete("/admin/deleteBlog", {
        params: { id: body.id },
      });
      thunkApi.dispatch(getAdminData({ page: 1, limit: 4 }));
      return res.result;
    } catch (error) {
      console.log(error);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  }
);

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    adminData: {
      blogs: [],
      chartData: [],
      pageCount: 0,
    },
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
    builder.addCase(getAdminData.fulfilled, (state, action) => {
      state.adminData = action.payload;
    });
    builder.addCase(addBlog.fulfilled, (state, action) => {
      state.adminData.blogs.push(action.payload);
    });
  },
});

export default adminSlice.reducer;
export const { incrementPage, decrementPage } = adminSlice.actions;
