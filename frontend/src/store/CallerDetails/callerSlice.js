import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCallerData } from "../api";

const initialState = {
  callerDataIsLoading: false,
  error: null,
  callerData: {
    data: [],
    pages: {
      total: 0,
      page: 0,
      pages: 0,
    },
  },
  page: 1,
  limit: 5,
};
const CallerDataSlice = createSlice({
  name: "caller_details",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Caller_data.pending, (state) => {
        state.callerDataIsLoading = true;
        state.error = null;
      })
      .addCase(Caller_data.fulfilled, (state, action) => {
        state.callerDataIsLoading = false;
        state.error = null;
        state.callerData.data = action.payload.data;
        state.callerData.pages.total = action.payload.paging.total;
        state.callerData.pages.page = action.payload.paging.page;
        state.callerData.pages.pages = action.payload.paging.pages;
      })
      .addCase(Caller_data.rejected, (state, action) => {
        state.callerDataIsLoading = false;
        state.error = action.error;
        state.callerData = [];
      });
  },
});

export const Caller_data = createAsyncThunk(
  `/v1/`,
  async (state, page, limit) => {
    const response = await getCallerData(state, page, limit);
    // console.log("redx", response);

    return response;
  }
);

export default CallerDataSlice.reducer;
