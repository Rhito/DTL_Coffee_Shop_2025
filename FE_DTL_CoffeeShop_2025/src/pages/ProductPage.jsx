import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import ProductsService from "../service/ProductsService";
import CategoryService from "../service/CategoryService";
import { CartContext } from "../context/CartContext";
import UILayout from "../components/layout/UILayout";

// Hàm debounce tùy chỉnh
function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]); // Checkbox cho danh mục
  const [priceRange, setPriceRange] = useState({ min: "0.01", max: "9999" }); // Khoảng giá
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  // Hàm lấy danh mục
  const fetchCategories = useCallback(async () => {
    try {
      const data = await CategoryService.getCategories();
      setCategories(data.content || data);
    } catch (err) {
      setError(err.message || "Failed to fetch categories");
    }
  }, []);

  // Hàm lấy sản phẩm
  const fetchProducts = useCallback(async (term, categoryIds, minPrice, maxPrice) => {
    setLoading(true);
    try {
      const queryParams = {
        page: 0,
        size: 1000,
        productName: term || undefined,
        categoryIds: categoryIds.length > 0 ? categoryIds.join(",") : undefined, // Chuỗi categoryIds
        minPrice: minPrice ? parseFloat(minPrice) : undefined, // Chuyển sang số
        maxPrice: maxPrice ? parseFloat(maxPrice) : undefined, // Chuyển sang số
      };

      const data = await ProductsService.getProducts(queryParams);
      console.log("API Response:", data); // Debug: Log dữ liệu trả về
      setProducts(data.content || data);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch products");
      setLoading(false);
      console.error("Fetch Products Error:", err);
    }
  }, []);

  // Debounce hàm fetchProducts
  const debouncedFetchProducts = useCallback(
    debounce((term, categoryIds, minPrice, maxPrice) =>
      fetchProducts(term, categoryIds, minPrice, maxPrice), 500),
    [fetchProducts]
  );

  // Gọi API khi các bộ lọc thay đổi
  useEffect(() => {
    fetchCategories(); // Lấy danh mục khi trang tải
    debouncedFetchProducts(searchTerm, selectedCategories, priceRange.min, priceRange.max);
  
  }, [searchTerm, selectedCategories, priceRange, debouncedFetchProducts, fetchCategories]);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.productName} added to cart!`);
  };

  return (
    <UILayout>
      <div className="flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Sidebar bên trái */}
        <aside className="w-1/4 pr-8">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          {/* Bộ lọc danh mục */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Categories</h3>
            {categories.length === 0 ? (
              <p className="text-gray-500">Loading categories...</p>
            ) : (
              categories.map((category) => (
                <label key={category.categoryID} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.categoryID)}
                    onChange={() => handleCategoryChange(category.categoryID)}
                    className="mr-2"
                  />
                  {category.categoryName}
                </label>
              ))
            )}
          </div>

          {/* Bộ lọc giá */}
          <div>
            <h3 className="text-lg font-medium mb-2">Price Range</h3>
            <div className="flex space-x-2">
              <input
                type="number"
                name="min"
                value={priceRange.min}
                onChange={handlePriceChange}
                placeholder="Min"
                min="0"
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="max"
                value={priceRange.max}
                onChange={handlePriceChange}
                placeholder="Max"
                min="0"
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </aside>

        {/* Nội dung chính */}
        <main className="w-3/4">
          <div className="mb-8">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search for coffee..."
              className="w-full max-w-md block px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {loading && <p className="text-center text-gray-500">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.length === 0 ? (
                <p className="text-center text-gray-500">No products found.</p>
              ) : (
                products.map(
                  (product) =>
                    product.status === "Active" && (
                      <div
                        key={product.productID}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative group h-96"
                      >
                        <div className="absolute bg-white bg-opacity-90 bottom-0 left-0 right-0 p-4 duration-600 ease-in-out h-auto">
                          <h4 className="text-xl font-light text-gray-800">
                            {product.productName}
                          </h4>
                          <p className="text-gray-600 mt-1 mb-4">
                            ${product.price.toFixed(2)}
                          </p>
                          <Link
                            to={`/product-detail/${product.productID}`}
                            className="flex-1 text-center text-gray-800 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-200"
                          >
                            View Details
                          </Link>
                        </div>
                        <Link
                          className="mt-2"
                          to={`/product-detail/${product.productID}`}
                        >
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
                              onClick={() => handleAddToCart(product)}
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
                    )
                )
              )}
            </div>
          )}
        </main>
      </div>
    </UILayout>
  );
}

export default ProductPage;