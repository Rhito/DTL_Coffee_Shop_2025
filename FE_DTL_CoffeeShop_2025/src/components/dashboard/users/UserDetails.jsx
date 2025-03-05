import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UsersService from "../../../service/UsersService";
import DashboardLayout from "../../layout/DashboardLayout";

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const data = await UsersService.showUser(id);
        setUser(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch user details");
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">User Details</h2>
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!loading && !error && user && (
          <div className="space-y-4">
            <p>
              <strong>ID:</strong> {user.userID}
            </p>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Full Name:</strong> {user.fullName}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        )}
        <button
          onClick={() => navigate("/users")}
          className=" mt-6 w-1/6 py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200"
        >
          Back to List
        </button>
      </div>
    </DashboardLayout>
  );
}

export default UserDetails;
