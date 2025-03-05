import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InventoryService from "../../../service/InventoryService";
import DashboardLayout from "../../layout/DashboardLayout";

function InventoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid inventory ID");
      return;
    }
    const fetchInventory = async () => {
      setLoading(true);
      try {
        const data = await InventoryService.showInventory(id);
        setInventory(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch inventory details");
        setLoading(false);
      }
    };
    fetchInventory();
  }, [id]);

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Inventory Details</h2>
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!loading && !error && inventory && (
          <div className="space-y-4">
            <p><strong>ID:</strong> {inventory.inventoryID}</p>
            <p><strong>Product ID:</strong> {inventory.productID}</p>
            <p><strong>Quantity:</strong> {inventory.quantity}</p>
            <p><strong>Created At:</strong> {new Date(inventory.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(inventory.updatedAt).toLocaleString()}</p>
          </div>
        )}
        <button
          onClick={() => navigate("/inventory")}
          className="mt-6 w-full py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200"
        >
          Back to List
        </button>
      </div>
    </DashboardLayout>
  );
}

export default InventoryDetails;