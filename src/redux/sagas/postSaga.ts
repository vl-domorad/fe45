import { all, call, takeLatest, put, delay } from "redux-saga/effects";
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
import {
  GetPostsPayload,
  GetPostsResponseData,
  GetSearchedPostsPayload,
} from "src/redux/@types";
import {
  getSearchedPosts,
  setSearchedPosts,
} from "src/redux/reducers/postSlice";
import { toast } from "react-toastify";

function* getSinglePostWorker(action: PayloadAction<string>) {
  yield put(setSinglePostLoading(true));
  const response: ApiResponse<Post> = yield call(
    API.getSinglePost,
    action.payload
  );
  if (response.ok && response.data) {
    yield put(setSinglePost(response.data));
    toast.success("Post successfully loaded", { delay: 200 });
  } else {
    toast.error("Post loaded with error", { delay: 200 });
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

function* getSearchedPostsWorker(
  action: PayloadAction<GetSearchedPostsPayload>
) {
  yield delay(500);
  const { offset, search, isOverwrite } = action.payload;
  const response: ApiResponse<GetPostsResponseData> = yield call(
    API.getPosts,
    offset,
    search
  );
  if (response.ok && response.data) {
    const { results, count } = response.data;
    yield put(
      setSearchedPosts({
        postsList: results,
        total: count,
        isOverwrite,
      })
    );
  } else {
    console.error("Searched Posts error", response.problem);
  }
}
export default function* postsWatcher() {
  yield all([
    takeLatest(getSinglePost, getSinglePostWorker),
    takeLatest(getPostsList, getPostsWorker),
    takeLatest(getSearchedPosts, getSearchedPostsWorker),
  ]);
}
