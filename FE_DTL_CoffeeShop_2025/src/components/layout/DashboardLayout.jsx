import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UsersService from "../../service/UsersService";
import {
  Home,
  Users,
  Tag,
  Package,
  ShoppingCart,
  FileText,
  Gift,
  Calendar,
  Table,
  LogOut,
  Menu,
  X,
} from "lucide-react"; // Import biểu tượng từ Lucide React

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Trạng thái sidebar trên mobile
  const fullName = localStorage.getItem('fullName') || "Admin"
  // Kiểm tra quyền truy cập khi component mount
  useEffect(() => {
    if (
      !UsersService.isAuthenticated() ||
      (!UsersService.isAdmin() && !UsersService.isEmployee())
    ) {
      navigate("/not-found");
    }
  }, [navigate]);

  const navbar = [
    { path: "/users", name: "Users", icon: Users },
    { path: "/categories", name: "Categories", icon: Tag },
    { path: "/inventory", name: "Inventory", icon: Package },
    { path: "/orders", name: "Orders", icon: ShoppingCart },
    { path: "/order-details", name: "Order Details", icon: FileText },
    { path: "/products", name: "Products", icon: Gift },
    { path: "/promotions", name: "Promotions", icon: Gift },
    { path: "/reservations", name: "Reservations", icon: Calendar },
    { path: "/tables", name: "Tables", icon: Table },
  ];

  // Xử lý đăng xuất
  const handleLogout = () => {
    UsersService.logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0 z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-bold">Dashboard</h2>
          </Link>
          <button
            className="lg:hidden text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-4 px-4">
          <ul className="space-y-2">
            {UsersService.isAdmin() &&
              navbar.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              ))}
            {UsersService.isEmployee() && (
              <li>
                <a
                  href="#"
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200"
                >
                  <FileText className="h-5 w-5" />
                  <span>Tasks</span>
                </a>
              </li>
            )}
          </ul>
        </nav>
        {/* Nút Logout trong Sidebar */}
        <div className="absolute bottom-6 px-4 w-full">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 p-3 w-full rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              className="lg:hidden text-gray-600"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">
              Coffee Shop Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-800 font-medium">
              To Home Page
            </Link>
            <span className="text-gray-600">
              Welcome, {fullName}
            </span>
          </div>
        </header>

        {/* Nội dung chính */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;