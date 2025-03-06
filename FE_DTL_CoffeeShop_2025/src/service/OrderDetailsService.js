import api from "./api";

class OrderDetailsService {
  // Get Order Details list with pagination
  static async getOrderDetails(page = 0, size = 1000) {
    try {
      const response = await api.get("/orderdetails", {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Get order details failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Show Order Detail by ID
  static async showOrderDetail(orderDetailId) {
    if (!orderDetailId) {
      throw new Error("Order Detail ID is required");
    }
    try {
      const response = await api.get(`/orderdetails/show/${orderDetailId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Show order detail failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Add Order Detail
  static async addOrderDetail(orderDetailData) {
    try {
      const response = await api.post("/orderdetails", orderDetailData);
      return response.data;
    } catch (error) {
      console.error(
        "Add order detail failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Edit Order Detail
  static async editOrderDetail(orderDetailId, orderDetailData) {
    if (!orderDetailId) {
      throw new Error("Order Detail ID is required");
    }
    try {
      const response = await api.put(`/orderdetails/edit/${orderDetailId}`, orderDetailData);
      return response.data;
    } catch (error) {
      console.error(
        "Update order detail failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Delete Order Detail
  static async deleteOrderDetail(orderDetailId) {
    if (!orderDetailId) {
      throw new Error("Order Detail ID is required");
    }
    try {
      const response = await api.delete(`/orderdetails/delete/${orderDetailId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Delete order detail failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }
}

export default OrderDetailsService;