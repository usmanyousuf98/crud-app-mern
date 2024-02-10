import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginService, tokenCheck } from "./api";

const initialState = {
  token: localStorage.getItem("token"),
  isLoggedIn: localStorage.getItem("token") ? true : false,
  isLoading: false,
  error: "",
  message: "WellCome",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = "";
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.isLogin = false;
        state.isLoading = true;
        state.error = null;
        state.message = "";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        
        state.isLoading = false;
        // state.isLoggedIn = true;
        state.error = action.payload.error;
        state.message = action.payload.message;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.isLoading = false;
        localStorage.removeItem("token");
        state.error = action.payload.error;
        state.message = action.payload.message;
      });
  },
});
export const loginAsync = createAsyncThunk(
  "/wallet/trading",
  async (values) => {
    try {
      const { email, password } = values;
      const response = await loginService(email, password);
      // console.log(response);
      if (response.error) {
        return {
          error: true,
          isLoggedIn: false,
          message: "user not found",
          token: localStorage.removeItem("token"),
        };
      } else {
        return {
          error: false,
          isLoggedIn: true,
          message: "Login Sucessfull",
          token: localStorage.setItem("token", response.token),
        };
      }
      
    } catch (error) {
      console.error(error);
    }
  }
);
export const check = createAsyncThunk(
  "/wallet/trading/check",
  async (token) => {
    try {
      if (token ==='') {
        return{
          message: "user not found",
        }
      }
      const response = await tokenCheck(token);
      console.log(response);
      if (response.error) {
        return {
          error: true,
          isLoggedIn: false,
          message: "user not found",
          token: localStorage.removeItem("token"),
        };
      } else {
        return {
          error: false,
          isLoggedIn: true,
          message: "Login Sucessfull",
          token: localStorage.setItem("token", response.token),
        };
      }
    
    } catch (error) {
      console.error(error);
    }
  }
);

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
