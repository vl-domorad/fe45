import { all, call, takeLatest, put } from "redux-saga/effects";
import {
  getPostsList,
  getSinglePost,
  setPostsList,
  setPostsListLoading,
  setSinglePost,
  setSinglePostLoading,
} from "src/redux/reducers/postSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "apisauce";
import API from "src/utils/api";
import { Post } from "src/@types";
import { GetPostsPayload, GetPostsResponseData } from "src/redux/@types";

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
function* getPostsWorker(action: PayloadAction<GetPostsPayload>) {
  yield put(setPostsListLoading(true));
  const { offset, isOverwrite } = action.payload;
  const response: ApiResponse<GetPostsResponseData> = yield call(
    API.getPosts,
    offset
  );
  if (response.ok && response.data) {
    const { count, results } = response.data;
    yield put(
      setPostsList({
        total: count,
        postsList: results,
        isOverwrite,
      })
    );
  } else {
    console.error("Get Posts List error", response.problem);
  }
  yield put(setPostsListLoading(false));
}

export default function* postsWatcher() {
  yield all([
    takeLatest(getSinglePost, getSinglePostWorker),
    takeLatest(getPostsList, getPostsWorker),
  ]);
}
