import { useLocation, Navigate, Outlet } from "react-router-dom";
import Notiflix from "notiflix";
import { useSelector } from "react-redux";
import { getIslogin } from "../redux/auth/auth-selectors";
import { getIsLoading } from "../redux/auth/auth-selectors";

import React from "react";

export default function RequireAuth({ children }) {
  const location = useLocation();
  const isLogin = useSelector(getIslogin);
  const IsLoading = useSelector(getIsLoading);

  if (IsLoading) {
    return <div>Loading...</div>;
  }

  // if (!token) {
  if (!isLogin) {
    Notiflix.Notify.failure("Authorization Reqired");
    return <Navigate to="/login" state={{ from: location }} />;
  }
  // }

  return <Outlet />;
}
