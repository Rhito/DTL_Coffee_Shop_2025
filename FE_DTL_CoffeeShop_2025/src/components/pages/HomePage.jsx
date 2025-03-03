// src/components/pages/HomePage.jsx
import React from "react";

import UsersService from "../service/UsersService";
UsersService.logout();
function HomePage() {
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <div className="bg-[#ccc]-100 text-white">Hello</div>
    </div>
  );
}

export default HomePage; // 🟢 Cần phải có dòng này
