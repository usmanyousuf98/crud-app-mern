import { combineReducers } from "@reduxjs/toolkit";
import CallerDataSlice from "./CallerDetails/callerSlice";

const rootReducer = combineReducers({
  data: CallerDataSlice,
  // other reducers go here
});
export default rootReducer;
