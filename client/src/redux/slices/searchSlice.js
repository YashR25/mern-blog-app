import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./mainSlice";

export const getSearchData = createAsyncThunk(
  "/blog/search",
  async (body, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const res = await axiosClient.get("/blog/search", {
        params: { searchText: body.searchText, page: body.page, limit: 4 },
      });
      return res.result;
    } catch (error) {
      console.log(error);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  }
);

const searchSlice = createSlice({
  name: "searchSlice",
  initialState: {
    searchData: {},
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
    builder.addCase(getSearchData.fulfilled, (state, action) => {
      state.searchData = action.payload;
    });
  },
});

export default searchSlice.reducer;
export const { incrementPage, decrementPage } = searchSlice.actions;
