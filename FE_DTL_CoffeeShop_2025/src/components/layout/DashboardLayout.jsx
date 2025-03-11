import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UsersService from "../../service/UsersService";
function DashboardLayout({ children }) {
  const navigate = useNavigate();

  // Kiểm tra quyền truy cập khi component mount
  useEffect(() => {
    if (
      !UsersService.isAuthenticated() ||
      (!UsersService.isAdmin() && !UsersService.isEmployee())
    ) {
      navigate("/not-found"); // Hoặc điều hướng tới trang khác nếu cần
    }
  }, [navigate]);

  const navbar = [
    { path: "/users", name: "Users" },
    { path: "/categories", name: "Categories" },
    { path: "/inventory", name: "Inventory" },
    { path: "/orders", name: "Orders" },
    { path: "/order-details", name: "Orders Details" },
    { path: "/products", name: "Products" },
    { path: "/promotions", name: "Promotions" },
    { path: "/reservations", name: "Reservations" },
    { path: "/tables", name: "Tables" },
  ];

  // Xử lý đăng xuất
  const handleLogout = () => {
    UsersService.logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Navbar (Sidebar) */}
      <div className="w-64 bg-gray-800 text-white p-6 fixed h-full">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          {UsersService.isAdmin() &&
            navbar.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `block p-2 rounded ${
                      isActive ? "bg-gray-700 text-white" : "hover:bg-gray-700"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          {UsersService.isEmployee() && (
            <li>
              <a href="#" className="block hover:bg-gray-700 p-2 rounded">
                Tasks
              </a>
            </li>
          )}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Coffee Shop Dashboard
          </h1>
          <a href="/" className="font-bold text-gray-600">
            To Home Page
          </a>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              Welcome, {UsersService.isAdmin() ? "Admin" : "Employee"}
            </span>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Nội dung chính (truyền từ children) */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
