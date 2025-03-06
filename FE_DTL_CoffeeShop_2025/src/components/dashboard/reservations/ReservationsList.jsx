import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReservationsService from "../../../service/ReservationsService";
import DashboardLayout from "../../layout/DashboardLayout";

function ReservationsList() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ReservationsService.getReservations();
      setReservations(data.content || data);
      setLoading(false);
    } catch (err) {
      setError(err || "Failed to fetch reservations");
      setLoading(false);
    }
  };

  const handleDelete = async (reservationId) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      setLoading(true);
      setError(null);
      try {
        await ReservationsService.deleteReservation(reservationId);
        setReservations(reservations.filter((reservation) => reservation.reservationID !== reservationId));
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to delete reservation");
        setLoading(false);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Reservations List</h2>
          <button
            onClick={() => navigate("/reservations/create")}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Add New Reservation
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
                  Customer ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Table ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reservation Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guests
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservations.map((reservation) => (
                <tr key={reservation.reservationID}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.reservationID}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.customerID}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.tableID}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(reservation.reservationDate).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.numberOfGuests}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => navigate(`/reservations/details/${reservation.reservationID}`)}
                      className="text-green-600 hover:underline mr-4"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/reservations/edit/${reservation.reservationID}`)}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(reservation.reservationID)}
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

export default ReservationsList;