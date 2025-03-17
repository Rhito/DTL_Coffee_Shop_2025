// src/pages/ProductDetailPage.js
import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import ProductsService from "../service/ProductsService";
import Header from "../components/common/Header";
import { CartContext } from "../context/CartContext"; // Import CartContext
import UILayout from "../components/layout/UILayout";

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext); // Sử dụng CartContext

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await ProductsService.showProduct(productId);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch product details");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity); // Thêm vào giỏ hàng toàn cục
    alert(`${quantity} ${product.productName} added to cart!`);
  };

  if (loading)
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!product)
    return <div className="text-center py-20">Product not found</div>;

  return (
    <UILayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="text-sm text-gray-600 space-x-2">
          <Link to="/" className="hover:text-gray-800">
            Home
          </Link>
          <span>›</span>
          <Link to="/product-page" className="hover:text-gray-800">
            Products
          </Link>
          <span>›</span>
          <span className="text-gray-800">{product.productName}</span>
        </nav>
      </div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src={
                product.imageURL
                  ? `http://localhost:8080${product.imageURL}`
                  : "https://via.placeholder.com/500x500"
              }
              alt={product.productName}
              className="w-full h-[500px] object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.productName}
            </h1>
            <p className="text-2xl font-semibold text-[#d4a373] mb-4">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description || "No description available."}
            </p>
            <div className="flex items-center mb-6">
              <span className="mr-4 text-gray-700 font-medium">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="w-12 h-10 flex items-center justify-center text-gray-800 font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={handleAddToCart} // Sử dụng hàm từ CartContext
              className="w-full bg-[#d4a373] text-white py-3 rounded-md font-medium hover:bg-[#b38b59] transition duration-300 transform hover:scale-105"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </UILayout>
  );
}

export default ProductDetailPage;
