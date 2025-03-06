import api from "./api";

class TablesService {
  // Get Tables list with pagination
  static async getTables(page = 0, size = 1000) {
    try {
      const response = await api.get("/tables", {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Get tables failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Show Table by ID
  static async showTable(tableId) {
    if (!tableId) {
      throw new Error("Table ID is required");
    }
    try {
      const response = await api.get(`/tables/show/${tableId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Show table failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Add Table
  static async addTable(tableData) {
    try {
      const response = await api.post("/tables", tableData);
      return response.data;
    } catch (error) {
      console.error(
        "Add table failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Edit Table
  static async editTable(tableId, tableData) {
    if (!tableId) {
      throw new Error("Table ID is required");
    }
    try {
      const response = await api.put(`/tables/edit/${tableId}`, tableData);
      return response.data;
    } catch (error) {
      console.error(
        "Update table failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Delete Table
  static async deleteTable(tableId) {
    if (!tableId) {
      throw new Error("Table ID is required");
    }
    try {
      const response = await api.delete(`/tables/delete/${tableId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Delete table failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }
}

export default TablesService;