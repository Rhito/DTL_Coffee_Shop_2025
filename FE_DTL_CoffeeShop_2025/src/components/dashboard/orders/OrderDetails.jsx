import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrdersService from "../../../service/OrdersService";
import DashboardLayout from "../../layout/DashboardLayout";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid order ID");
      return;
    }
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const data = await OrdersService.showOrder(id);
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(err || "Failed to fetch order details");
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);
  const handleEdit = () => {
    navigate(`/orders/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setLoading(true);
      setError(null);
      try {
        await OrdersService.deleteOrder(id);
        navigate("/orders");
      } catch (err) {
        setError(err.message || "Failed to delete order");
        setLoading(false);
      }
    }
  };
  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!loading && !error && order && (
          <div className="space-y-4">
            <p>
              <strong>ID:</strong> {order.orderID}
            </p>
            <p>
              <strong>Customer ID:</strong> {order.customerID}
            </p>
            <p>
              <strong>User ID:</strong> {order.userID}
            </p>
            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(order.orderDate).toLocaleString()}
            </p>
            <p>
              <strong>Total Amount:</strong> {order.totalAmount}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Notes:</strong> {order.notes || "N/A"}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {new Date(order.updatedAt).toLocaleString()}
            </p>
          </div>
        )}
        {/* Thêm nút Edit và Delete */}
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
            onClick={() => navigate("/orders")}
            className="flex-1 py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200"
          >
            Back to List
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default OrderDetails;
