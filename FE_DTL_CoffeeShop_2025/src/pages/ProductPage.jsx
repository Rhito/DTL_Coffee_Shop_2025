import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductsService from "../service/ProductsService";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products khi trang tải hoặc khi searchTerm thay đổi
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = {
          page: 0,
          size: 1000,
          productName: searchTerm, // Gửi searchTerm lên backend
        };
        const data = await ProductsService.getProducts(queryParams);
        setProducts(data.content || data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch products");
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchTerm]);

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.productID === product.productID);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.productID === product.productID
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.productID !== productId));
  };

  // Tính tổng tiền giỏ hàng
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-light text-gray-800 tracking-wider">DTL Coffee</h1>
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition duration-200">
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-600 hover:text-gray-900 transition duration-200"
            >
              Products
            </Link>
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
                        <div
                          key={item.productID}
                          className="flex justify-between items-center py-2 border-b"
                        >
                          <span className="text-gray-800">
                            {item.productName} x {item.quantity}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
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
                        <p className="text-gray-800 font-semibold">
                          Total: ${cartTotal.toFixed(2)}
                        </p>
                        <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                          Checkout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for coffee..."
            className="w-full max-w-md mx-auto block px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Products List */}
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.productID}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
              >
                <img
                  src={product.imageURL || "https://via.placeholder.com/300x200"}
                  alt={product.productName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-xl font-light text-gray-800">{product.productName}</h4>
                  <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                      Add to Cart
                    </button>
                    <Link
                      to={`/products/details/${product.productID}`}
                      className="flex-1 text-center text-gray-800 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-200"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-light">© 2025 DTL Coffee. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-200">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ProductPage;