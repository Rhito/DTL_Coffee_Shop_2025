// src/pages/ProductPage.js
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import ProductsService from "../service/ProductsService";
import Header from "../components/common/Header";
import { CartContext } from "../context/CartContext"; // Import CartContext

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext); // Sử dụng CartContext

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = {
          page: 0,
          size: 1000,
          productName: searchTerm,
        };
        const data = await ProductsService.getProducts(queryParams);
        setProducts(data.content || data);
        setLoading(false);
      } catch (err) {
        setError(err || "Failed to fetch products");
        setLoading(false);
      }
    };
    fetchProducts();
  }, [searchTerm]);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleAddToCart = (product) => {
    addToCart(product); // Thêm vào giỏ hàng toàn cục
    alert(`${product.productName} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for coffee..."
            className="w-full max-w-md mx-auto block px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.productID}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative group h-96"
              >
                <div className="absolute bg-white bg-opacity-90 bottom-0 left-0 right-0 p-4 duration-600 ease-in-out">
                  <h4 className="text-xl font-light text-gray-800">
                    {product.productName}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <Link to={`/product-detail/${product.productID}`}>
                  <img
                    src={
                      `http://localhost:8080${product.imageURL}` ||
                      "https://via.placeholder.com/300x400"
                    }
                    alt={product.productName}
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-[0.9] sm:group-hover:scale-200 rounded-lg"
                  />
                </Link>

                <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                  <h4 className="text-xl font-light text-gray-800">
                    {product.productName}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => handleAddToCart(product)} // Sử dụng hàm từ CartContext
                      className="flex-1 bg-black text-white px-4 py-2 rounded-md hover:bg-slate-900 transition duration-200"
                    >
                      Add to Cart
                    </button>
                    <Link
                      to={`/product-detail/${product.productID}`}
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

export default ProductPage;
