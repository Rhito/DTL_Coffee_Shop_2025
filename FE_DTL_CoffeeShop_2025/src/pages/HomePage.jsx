import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Dribbble,
  Mail,
} from "lucide-react";
import ProductsService from "../service/ProductsService";
import Header from "../components/common/Header";
import backgroundImage from "../assets/pngtree-coffee-and-croissants-on-a-table-under-morning-lights-generated-ai-image_15739880_cleanup.jpg";

function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      try {
        const queryParams = { page: 0, size: 3 };
        const data = await ProductsService.getProducts(queryParams);
        setFeaturedProducts(data.content || data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch featured products:", err);
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[600px] flex items-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left text-white">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 animate-fade-in">
            Discover the Art of Coffee
          </h2>
          <p className="text-lg md:text-2xl font-light mb-8 max-w-2xl">
            Savor the elegance in every sip with DTL Coffee’s premium blends.
          </p>
          <Link
            to="/product-page"
            className="inline-block bg-[#d4a373] text-white px-8 py-4 rounded-full font-medium hover:bg-[#b38b59] transition-all duration-300 transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-semibold text-gray-800 text-center mb-12">
            Featured Coffees
          </h3>
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div
                  key={product.productID}
                  className="bg-gray-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <img
                    src={
                      product.imageURL
                        ? `http://localhost:8080${product.imageURL}`
                        : "https://via.placeholder.com/300x200"
                    }
                    alt={product.productName}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-6">
                    <h4 className="text-xl font-medium text-gray-800 mb-2">
                      {product.productName}
                    </h4>
                    <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
                    <Link
                      to={`/product-detail/${product.productID}`}
                      className="inline-block bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link
              to="/product-page"
              className="text-gray-800 hover:text-[#d4a373] font-medium transition duration-200"
            >
              See All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Connect With Us
          </h3>
          <ul className="flex justify-center space-x-6">
            {[
              { icon: Facebook, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Instagram, href: "#" },
              { icon: Dribbble, href: "#" },
              { icon: Mail, href: "#" },
            ].map((social, index) => (
              <li key={index}>
                <a
                  href={social.href}
                  className="text-gray-600 hover:text-[#d4a373] transition-colors duration-200"
                >
                  <social.icon className="w-8 h-8" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
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
    </div>
  );
}

export default HomePage;