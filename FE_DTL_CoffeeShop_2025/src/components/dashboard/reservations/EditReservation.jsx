import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReservationsService from "../../../service/ReservationsService";
import DashboardLayout from "../../layout/DashboardLayout";

function EditReservation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerID: "",
    tableID: "",
    reservationDate: "",
    numberOfGuests: "",
    status: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid reservation ID");
      return;
    }
    const fetchReservation = async () => {
      setLoading(true);
      try {
        const data = await ReservationsService.showReservation(id);
        setFormData({
          customerID: data.customerID,
          tableID: data.tableID,
          reservationDate: data.reservationDate
            ? new Date(data.reservationDate).toISOString().slice(0, 16)
            : "",
          numberOfGuests: data.numberOfGuests,
          status: data.status,
          notes: data.notes || "",
        });
        setLoading(false);
      } catch (err) {
        setError(err || "Failed to fetch reservation details");
        setLoading(false);
      }
    };
    fetchReservation();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "customerID" || name === "tableID" || name === "numberOfGuests" ? parseInt(value) || "" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await ReservationsService.editReservation(id, formData);
      navigate("/reservations");
      setLoading(false);
    } catch (err) {
      setError(err || "Failed to update reservation");
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Edit Reservation</h2>
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!loading && !error && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Customer ID</label>
              <input
                type="number"
                name="customerID"
                value={formData.customerID}
                onChange={handleInputChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter customer ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Table ID</label>
              <input
                type="number"
                name="tableID"
                value={formData.tableID}
                onChange={handleInputChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter table ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Reservation Date</label>
              <input
                type="datetime-local"
                name="reservationDate"
                value={formData.reservationDate}
                onChange={handleInputChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
              <input
                type="number"
                name="numberOfGuests"
                value={formData.numberOfGuests}
                onChange={handleInputChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter number of guests"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter notes"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
                  loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                } transition duration-200`}
              >
                {loading ? "Saving..." : "Update Reservation"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/reservations")}
                className="w-full py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200"
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

export default EditReservation;