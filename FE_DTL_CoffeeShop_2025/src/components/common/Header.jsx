import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UsersService from "../../service/UsersService";
import { CartContext } from "../../context/CartContext";
import {
  ShoppingCart,
  LogOut,
  LogIn,
  User,
  ChevronDown,
  Coffee,
} from "lucide-react";

function Header({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();
  const { cart, removeFromCart, cartTotal } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Get customer information from localStorage
  const userName = localStorage.getItem("fullName") || "Guest";

  const handleLogout = () => {
    UsersService.logout();
    setIsLoggedIn(false);
    navigate("/");
  };

  // Cart content
  const cartContent = (
    <div className="relative">
      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="text-gray-600 hover:text-gray-900 transition duration-200 flex items-center"
      >
        <ShoppingCart className="w-6 h-6 mr-1" />
        <span>({cart.length})</span>
      </button>
      {isCartOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-lg p-4 z-10 transition-all duration-300 ease-in-out">
          <h3 className="text-lg font-semibold mb-2">Your Cart</h3>
          {cart.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-600">Your cart is empty</p>
              <Link
                to="/product-page"
                className="text-blue-600 hover:underline mt-2 block"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div
                    key={item.productID}
                    className="flex items-center py-2 border-b"
                  >
                    <img
                      src={`http://localhost:8080${item.imageURL}`}
                      alt={item.productName}
                      className="w-10 h-10 object-cover mr-2 rounded"
                    />
                    <div className="flex-1">
                      <p className="text-gray-800">{item.productName}</p>
                      <p className="text-gray-600 text-sm">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.productID)}
                        className="text-red-600 hover:text-red-800 text-sm mt-1"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-right text-gray-800 font-semibold">
                  Total: ${cartTotal.toFixed(2)}
                </p>
                <Link
                  to="/checkout"
                  className="mt-2 block text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );

  // User menu
  const userMenu = isLoggedIn ? (
    <div className="relative">
      <button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className="flex items-center text-gray-600 hover:text-gray-900 transition duration-200"
      >
        <User className="w-6 h-6 mr-1" />
        <span>{userName}</span>
        <ChevronDown className="w-4 h-4 ml-1" />
      </button>
      {isUserMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg p-2 z-10">
          <Link
            className="px-2 py-1 text-gray-600 hover:text-gray-900 flex items-center transition duration-200 hover:bg-blue-100 rounded-lg"
            to="/profile"
          >
            <Coffee className="w-5 h-5 mr-2" />
            Your info
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left text-gray-600 px-2 py-1 flex items-center transition duration-200 hover:text-amber-950 hover:bg-red-100 rounded-lg"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  ) : (
    <Link
      to="/login"
      className="text-gray-600 hover:text-gray-900 transition duration-200 flex items-center"
    >
      <LogIn className="w-6 h-6 mr-1" />
      Login
    </Link>
  );

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <NavLink
            to={"/"}
            className="text-2xl font-light text-gray-800 tracking-wider"
          >
            DTL Coffee
          </NavLink>
        </div>
        <nav className="space-x-6 flex items-center">
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
          {cartContent}
          {userMenu}
          {children}
        </nav>
      </div>
    </header>
  );
}

export default Header;
