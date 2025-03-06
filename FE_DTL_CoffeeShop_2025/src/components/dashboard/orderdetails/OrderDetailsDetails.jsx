import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderDetailsService from "../../../service/OrderDetailsService";
import DashboardLayout from "../../layout/DashboardLayout";

function OrderDetailsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid order detail ID");
      return;
    }
    const fetchOrderDetail = async () => {
      setLoading(true);
      try {
        const data = await OrderDetailsService.showOrderDetail(id);
        setOrderDetail(data);
        setLoading(false);
      } catch (err) {
        setError(err || "Failed to fetch order detail");
        setLoading(false);
      }
    };
    fetchOrderDetail();
  }, [id]);

  const handleEdit = () => {
    navigate(`/order-details/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this order detail?")) {
      setLoading(true);
      setError(null);
      try {
        await OrderDetailsService.deleteOrderDetail(id);
        navigate("/order-details");
      } catch (err) {
        setError(err || "Failed to delete order detail");
        setLoading(false);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Order Detail Details</h2>
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!loading && !error && orderDetail && (
          <div className="space-y-4">
            <p>
              <strong>ID:</strong> {orderDetail.orderDetailID}
            </p>
            <p>
              <strong>Order ID:</strong> {orderDetail.orderID}
            </p>
            <p>
              <strong>Product ID:</strong> {orderDetail.productID}
            </p>
            <p>
              <strong>Quantity:</strong> {orderDetail.quantity}
            </p>
            <p>
              <strong>Unit Price:</strong> {orderDetail.unitPrice}
            </p>
            <p>
              <strong>Discount:</strong> {orderDetail.discount || "0.00"}
            </p>
            <p>
              <strong>Subtotal:</strong> {orderDetail.subtotal || "0.00"}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(orderDetail.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {new Date(orderDetail.updatedAt).toLocaleString()}
            </p>
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
                onClick={() => navigate("/orderdetails")}
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

export default OrderDetailsDetails;
