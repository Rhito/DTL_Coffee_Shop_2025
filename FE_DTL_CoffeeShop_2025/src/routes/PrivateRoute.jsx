import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import UsersService from "../service/UsersService";

function PrivateRoute() {
  const isAuthenticated = UsersService.isAuthenticated();
  const isAdmin = UsersService.isAdmin();
  const isEmployee = UsersService.isEmployee();
  const isCustomer = UsersService.isCustomer();

  // Chỉ cho phép Admin và Employee truy cập
  if (isCustomer) return <Navigate to="/" replace />
  if (!isAuthenticated || (!isAdmin && !isEmployee)) {
    return <Navigate to="/404" replace />;
  }

  // Nếu hợp lệ, render các route con
  return <Outlet />;
}

export default PrivateRoute;
