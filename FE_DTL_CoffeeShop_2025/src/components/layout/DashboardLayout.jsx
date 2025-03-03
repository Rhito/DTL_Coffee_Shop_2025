import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UsersService from "../service/UsersService";

function DashboardLayout({ children }) {
  const navigate = useNavigate();

  // Kiểm tra quyền truy cập khi component mount
  useEffect(() => {
    if (
      !UsersService.isAuthenticated() ||
      (!UsersService.isAdmin() && !UsersService.isEmployee())
    ) {
      alert("Page Not Found!");
      navigate("/not-found"); // Hoặc điều hướng tới trang khác nếu cần
    }
  }, [navigate]);

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
          {UsersService.isAdmin() && (
            <>
              <li>
                <a
                  href="/dashboard/users"
                  className="block hover:bg-gray-700 p-2 rounded"
                >
                  Users
                </a>
              </li>
              <li>
                <a
                  href="/dashboard/categories"
                  className="block hover:bg-gray-700 p-2 rounded"
                >
                  Categories
                </a>
              </li>
            </>
          )}
          {UsersService.isEmployee() && (
            <li>
              <a
                href="/dashboard/tasks"
                className="block hover:bg-gray-700 p-2 rounded"
              >
                Tasks
              </a>
            </li>
          )}
          <li>
            <a href="#" className="block hover:bg-gray-700 p-2 rounded">
              Settings
            </a>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left hover:bg-red-600 p-2 rounded"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Coffee Shop Dashboard
          </h1>
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
