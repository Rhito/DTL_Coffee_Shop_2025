import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import ProductsService from "../../../service/ProductsService";
import DashboardLayout from "../../layout/DashboardLayout";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productId: id,
      productName: "",
      categoryID: "",
      description: "",
      price: "",
      status: "",
    },
  });
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [initialImageURL, setInitialImageURL] = useState("");
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
        reset({
          productName: data.productName,
          categoryID: data.categoryID || "",
          description: data.description || "",
          price: data.price,
          status: data.status,
        });
        setInitialImageURL(data.imageURL || "");
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch product details");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, reset]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreviewImage(previewUrl);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      // Cập nhật dữ liệu JSON
      const productData = {
        productName: data.productName,
        categoryID: data.categoryID ? parseInt(data.categoryID) : null,
        description: data.description || null,
        price: parseFloat(data.price),
        status: data.status,
      };
      await ProductsService.updateProductData(id, productData);

      // Cập nhật ảnh nếu có file mới
      if (file) {
        await ProductsService.updateProductImage(id, file);
      }

      navigate("/products");
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to update product";
      console.error("Update failed:", err.response?.data || err);
      setError(errorMessage);
    } finally {
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                {...register("productName", { required: "Product Name is required" })}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.productName && (
                <p className="text-red-500 text-sm">{errors.productName.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category ID</label>
              <input
                type="number"
                {...register("categoryID", {
                  setValueAs: (v) => (v === "" ? null : parseInt(v)),
                })}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...register("description")}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                step="0.01"
                {...register("price", {
                  required: "Price is required",
                  setValueAs: (v) => (v === "" ? "" : parseFloat(v)),
                })}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Image</label>
              {previewImage || initialImageURL ? (
                <img
                  src={
                    previewImage ||
                    (initialImageURL ? `http://localhost:8080${initialImageURL}` : "/fallback-image.jpg")
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
                {...register("status")}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option disabled value="">Select Status</option>
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