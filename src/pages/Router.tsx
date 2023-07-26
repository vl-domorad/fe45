import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Home from "src/pages/Home";
import SignUp from "src/pages/SignUp";
import RegistrationConfirmation from "src/pages/RegistrationConfirmation";
import Header from "src/components/Header";
import SelectedPost from "src/pages/SelectedPost";
import SignIn from "src/pages/SignIn";
import { AuthSelectors, getUserInfo } from "src/redux/reducers/authSlice";
import Search from "src/pages/Search";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export enum RoutesList {
  Home = "/",
  SignUp = "/sign-up",
  SignIn = "/sign-in",
  RegistrationConfirmation = "/activate/:uid/:token",
  SelectedPost = "/post/:id",
  Search = "/posts/:search",

  Default = "*",
}

const Router = () => {
  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserInfo());
    }
  }, [isLoggedIn]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={RoutesList.Home} element={<Header />}>
            <Route path={RoutesList.Home} element={<Home />} />
            <Route path={RoutesList.SignIn} element={<SignIn />} />
            <Route
              path={RoutesList.SignUp}
              element={
                !isLoggedIn ? <SignUp /> : <Navigate to={RoutesList.Home} />
              }
            />
            <Route
              path={RoutesList.SignIn}
              element={
                !isLoggedIn ? <SignIn /> : <Navigate to={RoutesList.Home} />
              }
            />
            <Route
              path={RoutesList.RegistrationConfirmation}
              element={
                !isLoggedIn ? (
                  <RegistrationConfirmation />
                ) : (
                  <Navigate to={RoutesList.Home} />
                )
              }
            />
            <Route path={RoutesList.SelectedPost} element={<SelectedPost />} />
            <Route
              path={RoutesList.RegistrationConfirmation}
              element={<RegistrationConfirmation />}
            />
            <Route path={RoutesList.Search} element={<Search />} />
            <Route
              path={RoutesList.Default}
              element={<Navigate to={RoutesList.Home} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default Router;
