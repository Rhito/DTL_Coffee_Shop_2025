import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TablesService from "../../../service/TablesService";
import DashboardLayout from "../../layout/DashboardLayout";

function TablesList() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await TablesService.getTables();
      setTables(data.content || data);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch tables");
      setLoading(false);
    }
  };

  const handleDelete = async (tableId) => {
    if (window.confirm("Are you sure you want to delete this table?")) {
      setLoading(true);
      setError(null);
      try {
        await TablesService.deleteTable(tableId);
        setTables(tables.filter((table) => table.tableID !== tableId));
        setLoading(false);
      } catch (err) {
        setError(err || "Failed to delete table");
        setLoading(false);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tables List</h2>
          <button
            onClick={() => navigate("/tables/create")}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Add New Table
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
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacity
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
              {tables.map((table) => (
                <tr key={table.tableID}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{table.tableID}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{table.tableName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{table.capacity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{table.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => navigate(`/tables/details/${table.tableID}`)}
                      className="text-green-600 hover:underline mr-4"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/tables/edit/${table.tableID}`)}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(table.tableID)}
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

export default TablesList;