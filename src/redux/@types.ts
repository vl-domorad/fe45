import { PostsList } from "src/@types";

export type PayloadWithDataAndCallback<Data> = {
  data: Data;
  callback: () => void;
};

export type SignUpUserData = {
  username: string;
  email: string;
  password: string;
};
export type SignUpResponseData = {
  username: string;
  email: string;
  id: number;
};

export type ActivateUserData = {
  uid: string;
  token: string;
};

export type SignUpUserPayload = PayloadWithDataAndCallback<SignUpUserData>;
export type ActivateUserPayload = PayloadWithDataAndCallback<ActivateUserData>;

export type SignInData = {
  email: string;
  password: string;
};

export type SignInUserPayload = PayloadWithDataAndCallback<SignInData>;

export type SignInUserResponseData = {
  access: string;
  refresh: string;
};

export type RefreshResponseData = {
  access: string;
};
export type UserInfoPayload = {
  username: string;
  email: string;
  id: number;
};

export type GetPostsPayload = {
  offset: number;
  isOverwrite: boolean;
};

export type SetPostsListPayload = {
  total: number;
  postsList: PostsList;
  isOverwrite: boolean;
};

export type GetSearchedPostsPayload = {
  offset: number;
  search: string;
};
export type SetSearchedPostsPayload = Omit<SetPostsListPayload, "isOverwrite">;

export type GetPostsResponseData = {
  count: number;
  next: string;
  previous: string;
  results: PostsList;
};
