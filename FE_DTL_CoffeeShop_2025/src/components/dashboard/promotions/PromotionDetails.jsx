import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PromotionsService from "../../../service/PromotionsService";
import DashboardLayout from "../../layout/DashboardLayout";

function PromotionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [promotion, setPromotion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid promotion ID");
      return;
    }
    const fetchPromotion = async () => {
      setLoading(true);
      try {
        const data = await PromotionsService.showPromotion(id);
        setPromotion(data);
        setLoading(false);
      } catch (err) {
        setError(err || "Failed to fetch promotion details");
        setLoading(false);
      }
    };
    fetchPromotion();
  }, [id]);

  const handleEdit = () => {
    navigate(`/promotions/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this promotion?")) {
      setLoading(true);
      setError(null);
      try {
        await PromotionsService.deletePromotion(id);
        navigate("/promotions");
      } catch (err) {
        setError(err || "Failed to delete promotion");
        setLoading(false);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Promotion Details</h2>
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!loading && !error && promotion && (
          <div className="space-y-4">
            <p><strong>ID:</strong> {promotion.promotionID}</p>
            <p><strong>Name:</strong> {promotion.promotionName}</p>
            <p><strong>Description:</strong> {promotion.description || "N/A"}</p>
            <p><strong>Discount Rate:</strong> {promotion.discountRate}</p>
            <p><strong>Start Date:</strong> {new Date(promotion.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(promotion.endDate).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {promotion.status}</p>
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
                onClick={() => navigate("/promotions")}
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

export default PromotionDetails;