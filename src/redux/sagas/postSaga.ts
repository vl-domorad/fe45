import { all, call, takeLatest, put } from "redux-saga/effects";
import {
  getSinglePost,
  setSinglePost,
  setSinglePostLoading,
} from "src/redux/reducers/postSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "apisauce";
import API from "src/utils/api";
import { Post } from "src/@types";

function* getSinglePostWorker(action: PayloadAction<string>) {
  yield put(setSinglePostLoading(true));
  const response: ApiResponse<Post> = yield call(
    API.getSinglePost,
    action.payload
  );
  if (response.ok && response.data) {
    yield put(setSinglePost(response.data));
  } else {
    console.error("Activate User error", response.problem);
  }
  yield put(setSinglePostLoading(false));
}

export default function* postsWatcher() {
  yield all([takeLatest(getSinglePost, getSinglePostWorker)]);
}
