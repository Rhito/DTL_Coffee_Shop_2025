import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Dribbble, Mail } from "lucide-react";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-light text-gray-800 tracking-wider">
            DTL Coffee
          </h1>
          <nav className="space-x-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 transition duration-200"
            >
              Home
            </Link>
            <Link
              to="/product-page"
              className="text-gray-600 hover:text-gray-900 transition duration-200"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-gray-900 transition duration-200"
            >
              About
            </Link>
            {localStorage.getItem("token") ? (
              <Link
                to="/logout"
                className="text-gray-600 hover:text-gray-900 transition duration-200"
              >
                Logout
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 transition duration-200"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[600px] flex items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1495474472287-45d59a205be9?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-light tracking-wide mb-4">
            Discover the Art of Coffee
          </h2>
          <p className="text-lg md:text-xl font-light mb-6">
            Savor the elegance in every sip with DTL Coffee.
          </p>
          <Link
            to="/product-page"
            className="inline-block bg-white text-gray-800 px-6 py-3 rounded-md hover:bg-gray-100 transition duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-light text-gray-800 text-center mb-12">
            Featured Coffees
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <img
                src="https://images.unsplash.com/photo-1512568400610-62da28bc8a4b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Espresso"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-xl font-light text-gray-800">Espresso</h4>
                <p className="text-gray-600 mt-1">$3.50</p>
                <Link
                  to="/products"
                  className="mt-4 inline-block text-gray-800 hover:text-gray-600 transition duration-200"
                >
                  View Details
                </Link>
              </div>
            </div>
            {/* Product Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <img
                src="https://images.unsplash.com/photo-1509785307050-d4066910ec1e?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Cappuccino"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-xl font-light text-gray-800">Cappuccino</h4>
                <p className="text-gray-600 mt-1">$4.00</p>
                <Link
                  to="/products"
                  className="mt-4 inline-block text-gray-800 hover:text-gray-600 transition duration-200"
                >
                  View Details
                </Link>
              </div>
            </div>
            {/* Product Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <img
                src="https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Latte"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-xl font-light text-gray-800">Latte</h4>
                <p className="text-gray-600 mt-1">$4.50</p>
                <Link
                  to="/products"
                  className="mt-4 inline-block text-gray-800 hover:text-gray-600 transition duration-200"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center py-16 bg-white-900 text-white">
        <div className="container mx-auto">
          <div className="mb-6">
            <h3 className="text-2xl font-bold">
              <a
                href="/"
                className="text-black transition-colors font-semibold"
              >
                DTL Coffee
              </a>
            </h3>
          </div>
          <div className="mb-4">
            <ul className="flex justify-center space-x-4">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  <Dribbble className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-light">
            © 2025 DTL Coffee. All rights reserved.
          </p>
          <div className="mt-4 space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-200"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
