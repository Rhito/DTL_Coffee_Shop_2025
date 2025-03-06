import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReservationsService from "../../../service/ReservationsService";
import DashboardLayout from "../../layout/DashboardLayout";

function ReservationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);
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
        setReservation(data);
        setLoading(false);
      } catch (err) {
        setError(err || "Failed to fetch reservation details");
        setLoading(false);
      }
    };
    fetchReservation();
  }, [id]);

  const handleEdit = () => {
    navigate(`/reservations/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      setLoading(true);
      setError(null);
      try {
        await ReservationsService.deleteReservation(id);
        navigate("/reservations");
      } catch (err) {
        setError(err || "Failed to delete reservation");
        setLoading(false);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Reservation Details</h2>
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!loading && !error && reservation && (
          <div className="space-y-4">
            <p><strong>ID:</strong> {reservation.reservationID}</p>
            <p><strong>Customer ID:</strong> {reservation.customerID}</p>
            <p><strong>Table ID:</strong> {reservation.tableID}</p>
            <p><strong>Reservation Date:</strong> {new Date(reservation.reservationDate).toLocaleString()}</p>
            <p><strong>Number of Guests:</strong> {reservation.numberOfGuests}</p>
            <p><strong>Status:</strong> {reservation.status}</p>
            <p><strong>Notes:</strong> {reservation.notes || "N/A"}</p>
            <p><strong>Created At:</strong> {new Date(reservation.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(reservation.updatedAt).toLocaleString()}</p>
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
                onClick={() => navigate("/reservations")}
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

export default ReservationDetails;