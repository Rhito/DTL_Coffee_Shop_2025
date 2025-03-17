import React from "react";
import { Link } from "react-router-dom";

function Footer({ className }) {
  return (
    <footer className={`bg-gray-800 text-white py-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-light">
          © 2025 DTL Coffee. All rights reserved.
        </p>
        <div className="mt-4 space-x-6">
          <Link
            to="#"
            className="text-gray-400 hover:text-white transition duration-200"
          >
            Privacy Policy
          </Link>
          <Link
            to="#"
            className="text-gray-400 hover:text-white transition duration-200"
          >
            Terms of Service
          </Link>
          <Link
            to="#"
            className="text-gray-400 hover:text-white transition duration-200"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
