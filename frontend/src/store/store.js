import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./CombineReducers";
import Switch from './toggel'
import authSlice from "./authSlice";
export const store = configureStore({
  reducer: {
    reducers: rootReducer,
    switch:Switch,
    auth:authSlice,
  },
});
