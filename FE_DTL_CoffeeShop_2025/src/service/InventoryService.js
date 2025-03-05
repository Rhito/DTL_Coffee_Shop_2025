import api from "./api";

class InventoryService {
  // Get Inventory list with pagination
  static async getInventories(page = 0, size = 1000) {
    try {
      const response = await api.get("/inventory", {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Get inventories failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Show Inventory by ID
  static async showInventory(inventoryId) {
    if (!inventoryId) {
      throw new Error("Inventory ID is required");
    }
    try {
      const response = await api.get(`/inventory/show/${inventoryId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Show inventory failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Add Inventory
  static async addInventory(inventoryData) {
    try {
      const response = await api.post("/inventory", inventoryData);
      return response.data;
    } catch (error) {
      console.error(
        "Add inventory failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Edit Inventory
  static async editInventory(inventoryId, inventoryData) {
    if (!inventoryId) {
      throw new Error("Inventory ID is required");
    }
    try {
      const response = await api.put(`/inventory/edit/${inventoryId}`, inventoryData);
      return response.data;
    } catch (error) {
      console.error(
        "Update inventory failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Delete Inventory
  static async deleteInventory(inventoryId) {
    if (!inventoryId) {
      throw new Error("Inventory ID is required");
    }
    try {
      const response = await api.delete(`/inventory/delete/${inventoryId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Delete inventory failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }
}

export default InventoryService;