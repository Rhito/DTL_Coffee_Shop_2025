import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderDetailsService from "../../../service/OrderDetailsService";
import DashboardLayout from "../../layout/DashboardLayout";

function AddOrderDetail() {
  const [formData, setFormData] = useState({
    orderID: "",
    productID: "",
    quantity: "",
    unitPrice: "",
    discount: "",
    subtotal: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "orderID" || name === "productID" || name === "quantity" ? parseInt(value) || "" : parseFloat(value) || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await OrderDetailsService.addOrderDetail(formData);
      navigate("/order-details");
      setLoading(false);
    } catch (err) {
      setError(err || "Failed to add order detail");
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add New Order Detail</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Order ID</label>
            <input
              type="number"
              name="orderID"
              value={formData.orderID}
              onChange={handleInputChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter order ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Product ID</label>
            <input
              type="number"
              name="productID"
              value={formData.productID}
              onChange={handleInputChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter quantity"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Unit Price</label>
            <input
              type="number"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleInputChange}
              step="0.01"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter unit price"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Discount</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              step="0.01"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter discount (optional)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subtotal</label>
            <input
              type="number"
              name="subtotal"
              value={formData.subtotal}
              onChange={handleInputChange}
              step="0.01"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter subtotal (optional)"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              } transition duration-200`}
            >
              {loading ? "Saving..." : "Add Order Detail"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/order-details")}
              className="w-full py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default AddOrderDetail;