import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InventoryService from "../../../service/InventoryService";
import DashboardLayout from "../../layout/DashboardLayout";

function InventoriesList() {
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInventories();
  }, []);

  const fetchInventories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await InventoryService.getInventories();
      setInventories(data.content || data);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch inventories");
      setLoading(false);
    }
  };

  const handleDelete = async (inventoryId) => {
    if (window.confirm("Are you sure you want to delete this inventory?")) {
      setLoading(true);
      setError(null);
      try {
        await InventoryService.deleteInventory(inventoryId);
        setInventories(inventories.filter((inventory) => inventory.inventoryID !== inventoryId));
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to delete inventory");
        setLoading(false);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Inventories List</h2>
          <button
            onClick={() => navigate("/inventory/create")}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Add New Inventory
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
                  Product ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventories.map((inventory) => (
                <tr key={inventory.inventoryID}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{inventory.inventoryID}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{inventory.productID}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{inventory.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => navigate(`/inventory/details/${inventory.inventoryID}`)}
                      className="text-green-600 hover:underline mr-4"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/inventory/edit/${inventory.inventoryID}`)}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(inventory.inventoryID)}
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

export default InventoriesList;