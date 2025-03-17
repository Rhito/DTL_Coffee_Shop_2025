import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import OrdersService from "../service/OrdersService";
import OrderDetailsService from "../service/OrderDetailsService";
import UILayout from "../components/layout/UILayout";

function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    paymentMethod: "Credit Card",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.address) {
      setError("Please fill in all required fields");
      return;
    }
    if (cart.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Replace with actual user ID from authentication
      const userID = 1;

      // Prepare order data
      const orderData = {
        userID,
        totalAmount: cartTotal,
        status: "Pending",
        notes: "",
        orderDate: new Date().toISOString(),
      };

      // Create the order
      const orderResponse = await OrdersService.addOrder(orderData);
      const orderID = orderResponse.orderID; // Assuming the response includes orderID

      // Create order details for each cart item
      for (const item of cart) {
        const orderDetailData = {
          orderID,
          productID: item.productID,
          quantity: item.quantity,
          price: item.price,
        };
        await OrderDetailsService.addOrderDetail(orderDetailData);
      }

      // On success, clear cart and redirect
      clearCart();
      navigate("/confirmation");
    } catch (err) {
      setError(err.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UILayout>
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Summary */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
            {cart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.productID}
                    className="flex justify-between py-2 border-b"
                  >
                    <span>
                      {item.productName} x {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="mt-4 text-right">
                  <p className="text-gray-800 font-semibold">
                    Total: ${cartTotal.toFixed(2)}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Shipping Information Form */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Shipping Information</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Payment Method
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                </select>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={loading || cart.length === 0}
                className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
                  loading || cart.length === 0
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } transition duration-200`}
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </UILayout>
  );
}

export default CheckoutPage;
