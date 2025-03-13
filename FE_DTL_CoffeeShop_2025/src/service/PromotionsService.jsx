import api from "./api";

class PromotionsService {
  // Get Promotions list with pagination
  static async getPromotions(page = 0, size = 1000) {
    try {
      const response = await api.get("/promotions", {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Get promotions failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Show Promotion by ID
  static async showPromotion(promotionId) {
    if (!promotionId) {
      throw new Error("Promotion ID is required");
    }
    try {
      const response = await api.get(`/promotions/show/${promotionId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Show promotion failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Add Promotion
  static async addPromotion(promotionData) {
    try {
      const response = await api.post("/promotions", promotionData);
      return response.data;
    } catch (error) {
      console.error(
        "Add promotion failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Edit Promotion
  static async editPromotion(promotionId, promotionData) {
    if (!promotionId) {
      throw new Error("Promotion ID is required");
    }
    try {
      const response = await api.put(`/promotions/edit/${promotionId}`, promotionData);
      return response.data;
    } catch (error) {
      console.error(
        "Update promotion failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Delete Promotion
  static async deletePromotion(promotionId) {
    if (!promotionId) {
      throw new Error("Promotion ID is required");
    }
    try {
      const response = await api.delete(`/promotions/delete/${promotionId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Delete promotion failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }
}

export default PromotionsService;