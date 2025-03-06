import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PromotionsService from "../../../service/PromotionsService";
import DashboardLayout from "../../layout/DashboardLayout";

function PromotionsList() {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await PromotionsService.getPromotions();
      setPromotions(data.content || data);
      setLoading(false);
    } catch (err) {
      setError(err || "Failed to fetch promotions");
      setLoading(false);
    }
  };

  const handleDelete = async (promotionId) => {
    if (window.confirm("Are you sure you want to delete this promotion?")) {
      setLoading(true);
      setError(null);
      try {
        await PromotionsService.deletePromotion(promotionId);
        setPromotions(promotions.filter((promo) => promo.promotionID !== promotionId));
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to delete promotion");
        setLoading(false);
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Promotions List</h2>
          <button
            onClick={() => navigate("/promotions/create")}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Add New Promotion
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
                  Discount Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  End Date
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
              {promotions.map((promo) => (
                <tr key={promo.promotionID}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{promo.promotionID}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{promo.promotionName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{promo.discountRate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(promo.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(promo.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{promo.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => navigate(`/promotions/details/${promo.promotionID}`)}
                      className="text-green-600 hover:underline mr-4"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/promotions/edit/${promo.promotionID}`)}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(promo.promotionID)}
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

export default PromotionsList;