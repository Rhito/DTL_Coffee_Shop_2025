import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductsService from "../../../service/ProductsService";
import DashboardLayout from "../../layout/DashboardLayout";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid product ID");
      return;
    }
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await ProductsService.showProduct(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err || "Failed to fetch product details");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleEdit = () => {
    navigate(`/products/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setLoading(true);
      setError(null);
      try {
        await ProductsService.deleteProduct(id);
        navigate("/products");
      } catch (err) {
        setError(err.message || "Failed to delete product");
        setLoading(false);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Product Details</h2>
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!loading && !error && product && (
          <div className="space-y-4">
            <p><strong>ID:</strong> {product.productID}</p>
            <p><strong>Name:</strong> {product.productName}</p>
            <p><strong>Category ID:</strong> {product.categoryID || "N/A"}</p>
            <p><strong>Description:</strong> {product.description || "N/A"}</p>
            <p><strong>Price:</strong> {product.price}</p>
            <p><strong>Image URL:</strong> {product.imageURL || "N/A"}</p>
            <p><strong>Status:</strong> {product.status}</p>
            <p><strong>Created At:</strong> {new Date(product.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(product.updatedAt).toLocaleString()}</p>
            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleEdit}
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
              >
                Delete
              </button>
              <button
                onClick={() => navigate("/products")}
                className="flex-1 py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200"
              >
                Back to List
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default ProductDetails;