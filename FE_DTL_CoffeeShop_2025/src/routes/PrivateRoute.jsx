import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import UsersService from "../service/UsersService";

function PrivateRoute() {
  const isAuthenticated = UsersService.isAuthenticated();
  const isAdmin = UsersService.isAdmin();
  const isEmployee = UsersService.isEmployee();

  // Chỉ cho phép Admin và Employee truy cập
  if (!isAuthenticated || (!isAdmin && !isEmployee)) {
    return <Navigate to="/" replace />;
  }

  // Nếu hợp lệ, render các route con
  return <Outlet />;
}

export default PrivateRoute;
