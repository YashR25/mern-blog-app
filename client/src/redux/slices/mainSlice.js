import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getMainData = createAsyncThunk(
  "/getAllData",
  async (body, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const response = await axiosClient.get("/getAllData");
      return response.result;
    } catch (error) {
      console.log(error);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  }
);

export const getLatestBlogs = createAsyncThunk(
  "/getLatestBlogs",
  async (body, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const res = await axiosClient.get("/getLatestBlogs", {
        params: { page: body, limit: 4 },
      });
      return res.result;
    } catch (error) {
      console.log(error);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  }
);

const mainSlice = createSlice({
  name: "mainSlice",
  initialState: {
    isLoading: false,
    toastData: {},
    mainData: {},
    page: 1,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    showToast: (state, action) => {
      state.toastData = action.payload;
    },
    incrementPage: (state, action) => {
      state.page++;
    },
    decrementPage: (state, action) => {
      state.page--;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMainData.fulfilled, (state, action) => {
      state.mainData = action.payload;
    });
    builder.addCase(getLatestBlogs.fulfilled, (state, action) => {
      state.mainData.latestBlogs = action.payload;
    });
  },
});

export default mainSlice.reducer;

export const { setLoading, showToast, incrementPage, decrementPage } =
  mainSlice.actions;
