import { create } from "apisauce";
import { ActivateUserData, SignInData, SignUpUserData } from "src/redux/@types";

const API = create({
  baseURL: "https://studapi.teachmeskills.by",
});

const signUpUser = (data: SignUpUserData) => {
  return API.post("/auth/users/", data);
};

const getPosts = () => {
  return API.get("/blog/posts/?limit=12");
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

export default {
  signUpUser,
  getPosts,
  activateUser,
  getSinglePost,
  getUserInfo,
  createToken,
};
