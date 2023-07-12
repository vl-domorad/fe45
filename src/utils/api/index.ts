import { create } from "apisauce";
import { ActivateUserData, SignInData, SignUpUserData } from "src/redux/@types";
import { PER_PAGE } from "src/utils/constants";

const API = create({
  baseURL: "https://studapi.teachmeskills.by",
});

const signUpUser = (data: SignUpUserData) => {
  return API.post("/auth/users/", data);
};

const getPosts = (offset: number, search?: string) => {
  return API.get("/blog/posts/", { limit: PER_PAGE, offset, search });
};

const getSinglePost = (id: string) => {
  return API.get(`/blog/posts/${id}/`);
};

const activateUser = (data: ActivateUserData) => {
  return API.post("/auth/users/activation/", data);
};

const getUserInfo = (token: string) => {
  return API.get(
    "/auth/users/me/",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const createToken = (data: SignInData) => {
  return API.post("/auth/jwt/create/", data);
};

const verifyToken = (token: string) => {
  return API.post("/auth/jwt/verify/", { token });
};

const refreshToken = (refresh: string) => {
  return API.post("/auth/jwt/refresh/", { refresh });
};

export default {
  signUpUser,
  getPosts,
  activateUser,
  getSinglePost,
  getUserInfo,
  createToken,
  verifyToken,
  refreshToken,
};
