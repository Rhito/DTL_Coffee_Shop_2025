import api from "./api";

class OrdersService {
  // Get Orders list with pagination
  static async getOrders(page = 0, size = 1000) {
    try {
      const response = await api.get("/orders", {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Get orders failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Show Order by ID
  static async showOrder(orderId) {
    if (!orderId) {
      throw new Error("Order ID is required");
    }
    try {
      const response = await api.get(`/orders/show/${orderId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Show order failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Add Order
  static async addOrder(orderData) {
    try {
      const response = await api.post("/orders", orderData);
      return response.data;
    } catch (error) {
      console.error(
        "Add order failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Edit Order
  static async editOrder(orderId, orderData) {
    if (!orderId) {
      throw new Error("Order ID is required");
    }
    try {
      const response = await api.put(`/orders/edit/${orderId}`, orderData);
      return response.data;
    } catch (error) {
      console.error(
        "Update order failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Delete Order
  static async deleteOrder(orderId) {
    if (!orderId) {
      throw new Error("Order ID is required");
    }
    try {
      const response = await api.delete(`/orders/delete/${orderId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Delete order failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }
}

export default OrdersService;