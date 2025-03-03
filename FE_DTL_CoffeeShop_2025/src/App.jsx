import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/auth/LoginPage.jsx";
import RegisterPage from "./components/auth/RegistrationPage.jsx";

function App() {
  return (
    <BrowserRouter>
      {/* 🟢 Đảm bảo có BrowserRouter bọc ngoài */}
      <Routes>
        {/* 🟢 Route cho trang chủ */}
        <Route path="/" element={<HomePage />} />

        {/* 🟢 Route cho Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* 🟢 Route cho Register */}
        <Route path="/register" element={<RegisterPage />} />

        {/* 🟢 Xử lý khi không khớp route nào */}
        <Route
          path="*"
          element={
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100 ">
              <h1 className="text-6xl font-bold text-gray-500 mb-4 opacity-70">
                404
              </h1>
              <p className="text-2xl text-gray-600 opacity-70">
                Page Not Found
              </p>
              <a
                href="/"
                className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Go Home
              </a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
