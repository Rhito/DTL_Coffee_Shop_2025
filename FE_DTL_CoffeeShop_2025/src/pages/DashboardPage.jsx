import React, { useState, useEffect, useCallback } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import OrdersService from "../service/OrdersService";
import ReservationsService from "../service/ReservationsService";
import InventoryService from "../service/InventoryService";

function DashboardPage() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalReservations: 0,
    lowInventory: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentReservations, setRecentReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [orders, reservations, inventory] = await Promise.all([
        OrdersService.getOrders(0, 10),
        ReservationsService.getReservations(0, 10),
        InventoryService.getInventories(0, 10),
      ]);

      const totalOrders = orders.content?.length || orders.length || 0;
      const totalRevenue = orders.content?.reduce(
        (sum, order) => sum + (Number(order.totalAmount) || 0),
        0
      ) || 0;
      const totalReservations = reservations.content?.length || reservations.length || 0;
      const lowInventory = inventory.content?.filter(
        (item) => (Number(item.quantity) || 0) < 10
      ).length || 0;

      const sortedOrders = (orders.content || orders)
        .slice(0, 5)
        .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
      const sortedReservations = (reservations.content || reservations)
        .slice(0, 5)
        .sort((a, b) => new Date(b.reservationDate) - new Date(a.reservationDate));

      setStats({ totalOrders, totalRevenue, totalReservations, lowInventory });
      setRecentOrders(sortedOrders);
      setRecentReservations(sortedReservations);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      setError(error.message || "Failed to load dashboard data");
      if (retryCount < 3) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  }, [retryCount]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleRefresh = () => {
    setRetryCount(0);
    fetchDashboardData();
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <button
            onClick={handleRefresh}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            disabled={loading}
          >
            Refresh
          </button>
        </div>

        {loading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            <p className="text-gray-600 mt-2">Loading...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
            {retryCount < 3 && <p>Retrying... (Attempt {retryCount + 1}/3)</p>}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
                <p className="text-3xl font-bold text-blue-600">{stats.totalOrders}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
                <p className="text-3xl font-bold text-green-600">
                  ${stats.totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-700">Reservations</h3>
                <p className="text-3xl font-bold text-purple-600">{stats.totalReservations}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-700">Low Inventory</h3>
                <p className="text-3xl font-bold text-red-600">{stats.lowInventory}</p>
              </div>
            </div>

            {/* Data Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4 text-left">Order ID</th>
                        <th className="py-2 px-4 text-left">Total</th>
                      
                        <th className="py-2 px-4 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.length > 0 ? (
                        recentOrders.map((order, index) => (
                          <tr
                            key={order.orderID || `order-${index}`}
                            className="border-b hover:bg-gray-50"
                          >
                            <td>{console.log(order)}</td>
                            <td className="py-2 px-4">{order.orderID || "N/A"}</td>
                            <td className="py-2 px-4">
                              ${Number(order.totalAmount || 0).toLocaleString()}
                            </td>
                            
                            <td className="py-2 px-4">{order.status || "N/A"}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="py-2 px-4 text-center text-gray-500">
                            No recent orders available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Upcoming Reservations */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Upcoming Reservations</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4 text-left">Reservation ID</th>
                        <th className="py-2 px-4 text-left">Table</th>
                        <th className="py-2 px-4 text-left">Time</th>
                        <th className="py-2 px-4 text-left">Guests</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentReservations.length > 0 ? (
                        recentReservations.map((reservation, index) => (
                          <tr
                            key={reservation.reservationID || `reservation-${index}`}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="py-2 px-4">{reservation.reservationID || "N/A"}</td>
                            <td className="py-2 px-4">{reservation.tableID || "N/A"}</td>
                            <td className="py-2 px-4">
                              {reservation.reservationDate
                                ? new Date(reservation.reservationDate).toLocaleString()
                                : "N/A"}
                            </td>
                            <td className="py-2 px-4">{reservation.numberOfGuests || "N/A"}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="py-2 px-4 text-center text-gray-500">
                            No upcoming reservations available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default DashboardPage;