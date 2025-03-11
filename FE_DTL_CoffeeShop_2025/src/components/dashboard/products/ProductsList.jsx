import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductsService from "../../../service/ProductsService";
import DashboardLayout from "../../layout/DashboardLayout";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ProductsService.getProducts();
      setProducts(data.content || data); // Hỗ trợ dữ liệu phân trang hoặc không
      setLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch products");
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setLoading(true);
      setError(null);
      try {
        await ProductsService.deleteProduct(productId);
        setProducts(products.filter((product) => product.productID !== productId));
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to delete product");
        setLoading(false);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Products List</h2>
          <button
            onClick={() => navigate("/products/create")}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Add New Product
          </button>
        </div>
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!loading && !error && (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => ( product.status === "ACTIVE" && (
                <tr key={product.productID}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.productID}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.imageURL ? (
                      <img
                        src={`http://localhost:8080${product.imageURL}`} // Đường dẫn đầy đủ tới ảnh
                        alt={product.productName}
                        className="h-16 w-16 object-cover rounded-md"
                        onError={(e) => (e.target.src = "/fallback-image.jpg")} // Ảnh dự phòng nếu lỗi
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.productName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.categoryID}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => navigate(`/products/details/${product.productID}`)}
                      className="text-green-600 hover:underline mr-4"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/products/edit/${product.productID}`)}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.productID)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}

export default ProductsList;