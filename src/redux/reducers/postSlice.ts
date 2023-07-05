import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "src/redux/store";
import { Post, PostsList } from "src/@types";

type InitialState = {
  isSelectedPostModalOpened: boolean;
  selectedPost: Post | null;
  singlePost: Post | null;
  postsList: PostsList;
  singlePostLoading: boolean;
};

const initialState: InitialState = {
  isSelectedPostModalOpened: false,
  selectedPost: null,
  postsList: [],
  singlePost: null,
  singlePostLoading: false,
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
  }, // вот тут живут функции, которые ловят экшены по типу(т.е. по названию ф-и)
});

export const {
  setSelectedPostModalOpened,
  setSelectedPost,
  getSinglePost,
  setSinglePost,
  setSinglePostLoading,
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
};
// вот отсюда мы достаем данные, которые заранее видоизменили снежками (экшенами)

export default postSlice.reducer; // это мы группу функций экспортируем единым объектом
// чтобы потом запихнуть в store и чтобы редакс видел, куда ему дальше
// распределять экшены (снежки)
