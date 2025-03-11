// src/components/common/Header.js
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UsersService from "../../service/UsersService";
import { CartContext } from "../../context/CartContext"; // Import CartContext

function Header({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();
  const { cart, removeFromCart, cartTotal } = useContext(CartContext); // Sử dụng CartContext
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleLogout = () => {
    UsersService.logout();
    setIsLoggedIn(false);
    navigate("/");
  };

  const cartContent = (
    <div className="relative">
      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="text-gray-600 hover:text-gray-900 transition duration-200"
      >
        Cart ({cart.length})
      </button>
      {isCartOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-md p-4 z-10">
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.productID} className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-800">{item.productName} x {item.quantity}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">${(item.price * item.quantity).toFixed(2)}</span>
                    <button
                      onClick={() => removeFromCart(item.productID)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-right">
                <p className="text-gray-800 font-semibold">Total: ${cartTotal.toFixed(2)}</p>
                <Link
                  to="/cart"
                  className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-light text-gray-800 tracking-wider">
          DTL Coffee
        </h1>
        <nav className="space-x-6 flex items-center">
          <Link to="/" className="text-gray-600 hover:text-gray-900 transition duration-200">
            Home
          </Link>
          <Link to="/product-page" className="text-gray-600 hover:text-gray-900 transition duration-200">
            Products
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-gray-900 transition duration-200">
            About
          </Link>
          {cartContent}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900 transition duration-200"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-gray-600 hover:text-gray-900 transition duration-200">
              Login
            </Link>
          )}
          {children}
        </nav>
      </div>
    </header>
  );
}

export default Header;