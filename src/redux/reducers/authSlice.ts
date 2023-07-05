import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ActivateUserPayload,
  SignInUserPayload,
  SignUpUserPayload,
  UserInfoPayload,
} from "src/redux/@types";
import { ACCESS_TOKEN_KEY } from "src/utils/constants";
import { RootState } from "src/redux/store";

type InitialState = {
  accessToken: string;
  userInfo: UserInfoPayload | null;
};

const initialState: InitialState = {
  accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || "",
  userInfo: null,
};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    sighUpUser: (_, __: PayloadAction<SignUpUserPayload>) => {},
    activateUser: (_, __: PayloadAction<ActivateUserPayload>) => {},

    signInUser: (_, __: PayloadAction<SignInUserPayload>) => {},

    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    getUserInfo: (_, __: PayloadAction<undefined>) => {},

    setUserInfo: (state, action: PayloadAction<UserInfoPayload | null>) => {
      state.userInfo = action.payload;
    },
    logoutUser: (_, __: PayloadAction<undefined>) => {},
  },
});

export const {
  sighUpUser,
  signInUser,
  setAccessToken,
  activateUser,
  getUserInfo,
  setUserInfo,
  logoutUser,
} = authSlice.actions;

export const AuthSelectors = {
  getLoggedIn: (state: RootState) => !!state.authReducer.accessToken,
};

export default authSlice.reducer;
