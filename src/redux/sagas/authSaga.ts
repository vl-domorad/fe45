import { all, takeLatest, call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "apisauce";

import {
  activateUser,
  setAccessToken,
  sighUpUser,
  signInUser,
} from "src/redux/reducers/authSlice";
import {
  ActivateUserPayload,
  SignInUserPayload,
  SignInUserResponseData,
  SignUpResponseData,
  SignUpUserPayload,
} from "src/redux/@types";
import API from "src/utils/api";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "src/utils/constants";

function* sighUpUserWorker(action: PayloadAction<SignUpUserPayload>) {
  const { data, callback } = action.payload;
  const response: ApiResponse<SignUpResponseData> = yield call(
    API.signUpUser,
    data
  );
  if (response.ok && response.data) {
    callback();
  } else {
    console.error("Sigh Up User error", response.problem);
  }
}

function* activateUserWorker(action: PayloadAction<ActivateUserPayload>) {
  const { data, callback } = action.payload;
  const response: ApiResponse<undefined> = yield call(API.activateUser, data);
  if (response.ok) {
    callback();
  } else {
    console.error("Activate User error", response.problem);
  }
}

function* signInUserWorker(action: PayloadAction<SignInUserPayload>) {
  const { data, callback } = action.payload;

  const response: ApiResponse<SignInUserResponseData> = yield call(
    API.createToken,
    data
  );

  if (response.ok && response.data) {
    yield put(setAccessToken(response.data.access));
    localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access);
    localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh);
    callback(); // в этом случае делаем callback
  } else {
    console.error("Sigh In User error", response.problem);
  }
}

export default function* authSagaWatcher() {
  yield all([
    takeLatest(sighUpUser, sighUpUserWorker),
    takeLatest(activateUser, activateUserWorker),
    takeLatest(signInUser, signInUserWorker),
  ]);
}
