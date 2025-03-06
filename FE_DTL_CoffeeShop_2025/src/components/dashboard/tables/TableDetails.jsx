import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TablesService from "../../../service/TablesService";
import DashboardLayout from "../../layout/DashboardLayout";

function TableDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [table, setTable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid table ID");
      return;
    }
    const fetchTable = async () => {
      setLoading(true);
      try {
        const data = await TablesService.showTable(id);
        setTable(data);
        setLoading(false);
      } catch (err) {
        setError(err || "Failed to fetch table details");
        setLoading(false);
      }
    };
    fetchTable();
  }, [id]);

  const handleEdit = () => {
    navigate(`/tables/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this table?")) {
      setLoading(true);
      setError(null);
      try {
        await TablesService.deleteTable(id);
        navigate("/tables");
      } catch (err) {
        setError(err || "Failed to delete table");
        setLoading(false);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Table Details</h2>
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!loading && !error && table && (
          <div className="space-y-4">
            <p><strong>ID:</strong> {table.tableID}</p>
            <p><strong>Name:</strong> {table.tableName}</p>
            <p><strong>Capacity:</strong> {table.capacity}</p>
            <p><strong>Status:</strong> {table.status}</p>
            <p><strong>Created At:</strong> {new Date(table.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(table.updatedAt).toLocaleString()}</p>
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
                onClick={() => navigate("/tables")}
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

export default TableDetails;