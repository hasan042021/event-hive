import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
  token: undefined,
  user_id: undefined,
  user_info: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user_id;
    },
    // eslint-disable-next-line no-unused-vars
    userLoggedOut: (state, action) => {
      state.accessToken = undefined;
      state.user = undefined;
    },
    userInfoSet: (state, action) => {
      console.log(action.payload);
      state.user_info = action.payload;
    },
  },
});

export const { userLogin, userLoggedOut, userInfoSet } = authSlice.actions;
export default authSlice.reducer;
