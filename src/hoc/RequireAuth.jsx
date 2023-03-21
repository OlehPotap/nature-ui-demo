import { useLocation, Navigate, Outlet } from "react-router-dom";
import Notiflix from "notiflix";
import { useSelector } from "react-redux";
import { getIslogin } from "../redux/auth/auth-selectors";
import { getIsAuthLoading } from "../redux/auth/auth-selectors";
import { BallTriangle } from "react-loader-spinner";

import React from "react";

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export default function RequireAuth({ children }) {
  const location = useLocation();
  const isLogin = useSelector(getIslogin);
  const IsLoading = useSelector(getIsAuthLoading);

  if (IsLoading) {
    return (
      <div style={style}>
        <BallTriangle
          height={200}
          width={200}
          radius={5}
          color="#fff"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      </div>
    );
  }

  // if (!token) {
  if (!isLogin) {
    Notiflix.Notify.failure("Authorization Reqired");
    return <Navigate to="/login" state={{ from: location }} />;
  }
  // }

  return <Outlet />;
}
