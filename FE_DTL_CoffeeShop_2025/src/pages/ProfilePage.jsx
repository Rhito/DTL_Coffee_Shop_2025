import React, { useState, useEffect } from "react";
import OrdersService from "../service/OrdersService";
import OrderDetailsService from "../service/OrderDetailsService";
import ReservationsService from "../service/ReservationsService";
import UsersService from "../service/UsersService";
import UILayout from "../components/layout/UILayout";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [userForm, setUserForm] = useState({ fullName: "", email: "" });
  const [reservationForm, setReservationForm] = useState({
    reservationDate: "",
    numberOfPeople: 1,
    notes: "",
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem("userId");

        if (!userId) throw new Error("User not logged in");

        const userData = await UsersService.showUser(userId);
        const orderData = await OrdersService.getOrders();
        const reservationData = await ReservationsService.getReservations();

        setUser(userData);
        setUserForm({
          fullName: userData.fullName || "",
          email: userData.email || "",
        });
        setOrders(orderData.content || orderData);
        setReservations(reservationData.content || reservationData);
      } catch (err) {
        setError(err.message || "Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      await UsersService.editUser(userId, userForm);
      setUser({ ...user, ...userForm });
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      setError(err.message || "Failed to update profile");
    }
  };

  const handleReservationChange = (e) => {
    const { name, value } = e.target;
    setReservationForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const reservationData = {
        reservationDate: reservationForm.reservationDate,
        numberOfGuests: reservationForm.numberOfPeople, // Đổi thành numberOfGuests
        notes: reservationForm.notes,
        userID: userId,
      };
      console.log("Reservation Data:", reservationData); // Debug
      await ReservationsService.addReservation(reservationData);
      const updatedReservations = await ReservationsService.getReservations();
      setReservations(updatedReservations.content || updatedReservations);
      setReservationForm({ reservationDate: "", numberOfPeople: 1, notes: "" });
      alert("Reservation added successfully!");
    } catch (err) {
      setError(err.message || "Failed to add reservation");
      console.error("Reservation Submit Error:", err); // Debug
    }
  };

  const handleViewOrderDetails = async (orderId) => {
    try {
      const details = await OrderDetailsService.getOrderDetails();
      const orderDetails = (details.content || details).filter(
        (d) => d.orderID === orderId
      );
      setOrderDetails(orderDetails);
      setSelectedOrder(orderId);
    } catch (err) {
      setError(err.message || "Failed to load order details");
    }
  };

  const handleCancelReservation = async (reservationId) => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      try {
        await ReservationsService.deleteReservation(reservationId);
        setReservations(
          reservations.filter((r) => r.reservationID !== reservationId)
        );
        alert("Reservation cancelled successfully!");
      } catch (err) {
        setError(err.message || "Failed to cancel reservation");
      }
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <UILayout>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            {editMode ? (
              <form onSubmit={handleUserSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={userForm.fullName}
                    onChange={handleUserChange}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userForm.email}
                    onChange={handleUserChange}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <p>
                  <strong>Name:</strong> {user?.fullName || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email || "N/A"}
                </p>
                <button
                  onClick={() => setEditMode(true)}
                  className="mt-2 text-blue-600 hover:underline"
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Book a Table</h2>
          <form
            onSubmit={handleReservationSubmit}
            className="bg-white p-4 rounded-lg shadow space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Reservation Date
              </label>
              <input
                type="datetime-local"
                name="reservationDate"
                value={reservationForm.reservationDate}
                onChange={handleReservationChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of People
              </label>
              <input
                type="number"
                name="numberOfPeople"
                value={reservationForm.numberOfPeople}
                onChange={handleReservationChange}
                min="1"
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                name="notes"
                value={reservationForm.notes}
                onChange={handleReservationChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Any special requests?"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Book Now
            </button>
          </form>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
          {orders.length === 0 ? (
            <p className="text-gray-600">You have no orders yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.orderID}
                  className="bg-white p-4 rounded-lg shadow"
                >
                  <p>
                    <strong>Order ID:</strong> {order.orderID}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.orderDate).toLocaleString()}
                  </p>
                  <p>
                    <strong>Total:</strong> $
                    {(order.totalAmount || 0).toFixed(2)}
                  </p>
                  <p>
                    <strong>Status:</strong> {order.status}
                  </p>
                  <button
                    onClick={() => handleViewOrderDetails(order.orderID)}
                    className="mt-2 text-blue-600 hover:underline"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Reservations</h2>
          {reservations.length === 0 ? (
            <p className="text-gray-600">You have no reservations yet.</p>
          ) : (
            <div className="space-y-4">
              {reservations.map((reservation) => (
                <div
                  key={reservation.reservationID}
                  className="bg-white p-4 rounded-lg shadow"
                >
                  <p>
                    <strong>Reservation ID:</strong> {reservation.reservationID}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(reservation.reservationDate).toLocaleString()}
                  </p>
                  <p>
                    <strong>Number of People:</strong>{" "}
                    {reservation.numberOfPeople}
                  </p>
                  <p>
                    <strong>Notes:</strong> {reservation.notes || "None"}
                  </p>
                  {reservation.status === "Pending" && (
                    <button
                      onClick={() =>
                        handleCancelReservation(reservation.reservationID)
                      }
                      className="mt-2 text-red-600 hover:underline"
                    >
                      Cancel Reservation
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <h3 className="text-xl font-semibold mb-4">
                Order Details (ID: {selectedOrder})
              </h3>
              {orderDetails.length === 0 ? (
                <p className="text-gray-600">No details available.</p>
              ) : (
                <div className="space-y-2">
                  {orderDetails.map((detail) => (
                    <div key={detail.orderDetailId} className="border-b py-2">
                      <p>
                        <strong>Product ID:</strong> {detail.productID}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {detail.quantity}
                      </p>
                      <p>
                        <strong>Price:</strong> $
                        {(detail.price || 0).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={() => setSelectedOrder(null)}
                className="mt-4 w-full bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </UILayout>
  );
}

export default ProfilePage;