import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignUpUserPayload } from "src/redux/@types";

type InitialState = {};

const initialState: InitialState = {};

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    sighUpUser: (state, action: PayloadAction<SignUpUserPayload>) => {},
  },
});

export const { sighUpUser } = authSlice.actions;

export const AuthSelectors = {};

export default authSlice.reducer;
