import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrderDetailsService from "../../../service/OrderDetailsService";
import DashboardLayout from "../../layout/DashboardLayout";

function OrderDetailsList() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await OrderDetailsService.getOrderDetails();
      setOrderDetails(data.content || data);
      setLoading(false);
    } catch (err) {
      setError(err || "Failed to fetch order details");
      setLoading(false);
    }
  };

  const handleDelete = async (orderDetailId) => {
    if (window.confirm("Are you sure you want to delete this order detail?")) {
      setLoading(true);
      setError(null);
      try {
        await OrderDetailsService.deleteOrderDetail(orderDetailId);
        setOrderDetails(orderDetails.filter((detail) => detail.orderDetailID !== orderDetailId));
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to delete order detail");
        setLoading(false);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Order Details List</h2>
          <button
            onClick={() => navigate("/order-details/create")}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Add New Order Detail
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
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orderDetails.map((detail) => (
                <tr key={detail.orderDetailID}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{detail.orderDetailID}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{detail.orderID}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{detail.productID}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{detail.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{detail.unitPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => navigate(`/order-details/details/${detail.orderDetailID}`)}
                      className="text-green-600 hover:underline mr-4"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/order-details/edit/${detail.orderDetailID}`)}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(detail.orderDetailID)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}

export default OrderDetailsList;