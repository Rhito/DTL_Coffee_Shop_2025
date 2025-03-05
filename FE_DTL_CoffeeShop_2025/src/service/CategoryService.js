import api from "./api";

class CategoryService {
  // Get Categories list and paginate
  static async getCategories(page = 0, size = 1000) {
    try {
      const response = await api.get("/categories", {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Get categories failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Show Category
  static async showCategory(categoryId) {
    if (!categoryId) {
      throw new Error("Category ID is required");
    }
    try {
      const response = await api.get(`/categories/show/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Show category failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Add Category
  static async addCategory(categoryData) {
    try {
      const response = await api.post("/categories", categoryData);
      return response.data;
    } catch (error) {
      console.error(
        "Add category failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Edit Category
  static async editCategory(categoryId, categoryData) {
    if (!categoryId) {
      throw new Error("Category ID is required");
    }
    try {
      const response = await api.put(`/categories/edit/${categoryId}`, categoryData);
      return response.data;
    } catch (error) {
      console.error(
        "Update category failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Delete Category
  static async deleteCategory(categoryId) {
    if (!categoryId) {
      throw new Error("Category ID is required");
    }
    try {
      const response = await api.delete(`/categories/delete/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Delete category failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }
}

export default CategoryService;