import React from "react";
import Footer from "../common/Footer";
import Header from "../common/Header";
function UILayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
}

export default UILayout;
