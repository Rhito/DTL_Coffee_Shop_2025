// src/components/pages/HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import UsersService from "../service/UsersService";
//UsersService.logout();
function HomePage() {
  const navigate = useNavigate();
  // Xử lý đăng xuất
  const handleLogout = () => {
    UsersService.logout();
    navigate("/login");
  };
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <div className="bg-[#ccc]-100 text-white">Hello</div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}

export default HomePage; // 🟢 Cần phải có dòng này
