import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count:0
};

const Switch = createSlice({
  name: "toggel",
  initialState,

  reducers: {
    next: (state, action) => {
      state.count += action.payload
    },
    close: (state, action) => {},
  },
});

export const { next, close } = Switch.actions;

export default Switch.reducer;
