import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  userInfo: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { accessToken, userInfo } = action.payload;
      state.accessToken = accessToken;
      state.userInfo = userInfo;
      state.isAuthenticated = true;

      // Save token and userInfo to localStorage
      localStorage.setItem("accessToken", JSON.stringify(accessToken));
      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      // Set expiry of 7 days
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);
      localStorage.setItem("expiresAt", expiresAt.toISOString());
    },
    logout: (state) => {
      state.accessToken = null;
      state.userInfo = null;
      state.isAuthenticated = false;

      // Remove from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("expiresAt");
    },
    loadUserFromStorage: (state) => {
      const accessToken = localStorage.getItem("accessToken");
      const userInfo = localStorage.getItem("userInfo");
      const expiresAt = localStorage.getItem("expiresAt");

      if (accessToken && userInfo && new Date() < new Date(expiresAt)) {
        state.accessToken = JSON.parse(accessToken);
        state.userInfo = JSON.parse(userInfo);
        state.isAuthenticated = true;
      } else {
        // Clear if token is expired
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userInfo");
        localStorage.removeItem("expiresAt");
        state.isAuthenticated = false;
      }
    },
  },
});

export const { loginSuccess, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
