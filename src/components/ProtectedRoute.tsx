import React, { useContext } from "react";
import { Context } from "../Context";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const {
    state: { userInfo },
  } = useContext(Context);
  if (userInfo) {
    return <Outlet />;
  } else {
    return <Navigate to='/signin' />;
  }
};

export default ProtectedRoute;
