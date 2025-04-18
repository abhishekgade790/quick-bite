import { createSlice } from "@reduxjs/toolkit";

const loginStatusSlice = createSlice({
  name: "loginStatus",
  initialState: {
    isLogin: false,
    user: {},
  },
  reducers: {
    login(state, action) {
      state.isLogin = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isLogin = false;
      state.user = {};
    },
  },
});

export const { login, logout } = loginStatusSlice.actions;
export const loginStatusReducer = loginStatusSlice.reducer;
