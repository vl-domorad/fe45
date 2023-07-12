import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "src/redux/store";
import { Post, PostsList } from "src/@types";
import { GetPostsPayload, SetPostsListPayload } from "src/redux/@types";

type InitialState = {
  isSelectedPostModalOpened: boolean;
  selectedPost: Post | null;
  singlePost: Post | null;
  postsList: PostsList;
  totalCount: number;
  singlePostLoading: boolean;
  isPostsListLoading: boolean;
};

const initialState: InitialState = {
  isSelectedPostModalOpened: false,
  selectedPost: null,
  postsList: [],
  totalCount: 0,
  singlePost: null,
  singlePostLoading: false,
  isPostsListLoading: false,
};

const postSlice = createSlice({
  name: "postReducer",
  initialState,
  reducers: {
    setSelectedPostModalOpened: (state, action: PayloadAction<boolean>) => {
      state.isSelectedPostModalOpened = action.payload; //тут данные ловятся и кладутся на нужное место
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    getSinglePost: (_, __: PayloadAction<string>) => {},
    setSinglePostLoading: (state, action: PayloadAction<boolean>) => {
      state.singlePostLoading = action.payload;
    },
    setSinglePost: (state, action: PayloadAction<Post | null>) => {
      state.singlePost = action.payload;
    },

    getPostsList: (_, __: PayloadAction<GetPostsPayload>) => {},
    setPostsList: (state, action: PayloadAction<SetPostsListPayload>) => {
      const { total, isOverwrite, postsList } = action.payload;
      state.totalCount = total;
      if (isOverwrite) {
        state.postsList = postsList;
      } else {
        state.postsList.push(...postsList);
      }
    },
    setPostsListLoading: (state, action: PayloadAction<boolean>) => {
      state.isPostsListLoading = action.payload;
    },
  }, // вот тут живут функции, которые ловят экшены по типу(т.е. по названию ф-и)
});

export const {
  setSelectedPostModalOpened,
  setSelectedPost,
  getSinglePost,
  setSinglePost,
  setSinglePostLoading,
  getPostsList,
  setPostsList,
  setPostsListLoading,
} = postSlice.actions;
// а вот тут живут сами экшены, которые рождаются библиотекой исходя
// из названия ф-ии, которая их ловит

export const PostSelectors = {
  getSelectedPostModalOpened: (state: RootState) =>
    state.postReducer.isSelectedPostModalOpened,
  getSelectedPost: (state: RootState) => state.postReducer.selectedPost,
  getSinglePost: (state: RootState) => state.postReducer.singlePost,
  getSinglePostLoading: (state: RootState) =>
    state.postReducer.singlePostLoading,
  getPostsListLoading: (state: RootState) =>
    state.postReducer.isPostsListLoading,
  getPostsList: (state: RootState) => state.postReducer.postsList,
  getTotalPostsCount: (state: RootState) => state.postReducer.totalCount,
};
// вот отсюда мы достаем данные, которые заранее видоизменили снежками (экшенами)

export default postSlice.reducer; // это мы группу функций экспортируем единым объектом
// чтобы потом запихнуть в store и чтобы редакс видел, куда ему дальше
// распределять экшены (снежки)
