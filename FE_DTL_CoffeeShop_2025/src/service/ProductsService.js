import api from "./api";

class ProductsService {
  static async getProducts(params = { page: 0, size: 1000 }) {
    try {
      const response = await api.get("/products", { params });
      return response.data;
    } catch (error) {
      console.error(
        "Get products failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Các phương thức khác giữ nguyên
  static async showProduct(productId) {
    if (!productId) throw new Error("Product ID is required");
    try {
      const response = await api.get(`/products/show/${productId}`);
      return response.data;
    } catch (error) {
      console.error("Show product failed:", error?.response?.data?.message || error.message);
      throw error?.response?.data || error;
    }
  }

  static async addProduct(productData) {
    try {
      const response = await api.post("/products", productData);
      return response.data;
    } catch (error) {
      console.error("Add product failed:", error?.response?.data?.message || error.message);
      throw error?.response?.data || error;
    }
  }

  static async editProduct(productId, productData) {
    if (!productId) throw new Error("Product ID is required");
    try {
      const response = await api.put(`/products/edit/${productId}`, productData);
      return response.data;
    } catch (error) {
      console.error("Update product failed:", error?.response?.data?.message || error.message);
      throw error?.response?.data || error;
    }
  }

  static async deleteProduct(productId) {
    if (!productId) throw new Error("Product ID is required");
    try {
      const response = await api.delete(`/products/delete/${productId}`);
      return response.data;
    } catch (error) {
      console.error("Delete product failed:", error?.response?.data?.message || error.message);
      throw error?.response?.data || error;
    }
  }
}

export default ProductsService;