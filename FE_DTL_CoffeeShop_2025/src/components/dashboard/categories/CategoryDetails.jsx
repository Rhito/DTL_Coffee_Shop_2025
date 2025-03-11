import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import CategoryService from "../../../service/CategoryService";
import DashboardLayout from "../../layout/DashboardLayout";

function CategoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setLoading(true);
      setError(null);
      try {
        await CategoryService.deleteCategory(categoryId);
        navigate("/categories");
        setLoading(false);
      } catch (err) {
        setError(err || "Failed to delete category");
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    if (!id) {
      setError("Invalid category ID");
      return;
    }
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const data = await CategoryService.showCategory(id);
        setCategory(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch category details");
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
        <h2 className="text-xl font-semibold mb-4">Category Details</h2>
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!loading && !error && category && (
          <div className="space-y-4">
            <p>
              <strong>ID:</strong> {category.categoryID}
            </p>
            <p>
              <strong>Name:</strong> {category.categoryName}
            </p>
            <p>
              <strong>Description:</strong> {category.description}
            </p>
            <p>
              <strong>Status:</strong> {category.status}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(category.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {new Date(category.updatedAt).toLocaleString()}
            </p>
            <div className="flex space-x-4">
              <Link
                to={`/categories/edit/${category.categoryID}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(category.categoryID)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => navigate("/categories")}
          className="mt-6 w-full py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200"
        >
          Back to List
        </button>
      </div>
    </DashboardLayout>
  );
}

export default CategoryDetails;
