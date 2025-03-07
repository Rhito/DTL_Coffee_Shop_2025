import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductsService from "../../../service/ProductsService";
import DashboardLayout from "../../layout/DashboardLayout";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: "",
    categoryID: "",
    description: "",
    price: "",
    imageURL: "",
    status: "",
  });
  const [file, setFile] = useState(null); // Thêm state cho file mới
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
        setFormData({
          productName: data.productName,
          categoryID: data.categoryID || "",
          description: data.description || "",
          price: data.price,
          imageURL: data.imageURL || "",
          status: data.status,
        });
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch product details");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "categoryID" ? parseInt(value) || "" : name === "price" ? parseFloat(value) || "" : value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setFormData((prev) => ({ ...prev, imageURL: previewUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await ProductsService.editProduct(id, formData, file);
      navigate("/products");
      setLoading(false);
    } catch (err) {
      setError(err.message || "Failed to update product");
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!loading && !error && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category ID</label>
              <input
                type="number"
                name="categoryID"
                value={formData.categoryID}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Image</label>
              {formData.imageURL ? (
                <img
                  src={
                    file
                      ? formData.imageURL
                      : `http://localhost:8080${formData.imageURL}`
                  }
                  alt="Product"
                  className="mt-2 h-32 w-32 object-cover rounded-md"
                  onError={(e) => (e.target.src = "/fallback-image.jpg")}
                />
              ) : (
                <p className="mt-2 text-gray-500">No image available</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Upload New Image</label>
              <input
                type="file"
                name="imageFile"
                onChange={handleFileChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
                  loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Saving..." : "Update Product"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="w-full py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
}

export default EditProduct;
