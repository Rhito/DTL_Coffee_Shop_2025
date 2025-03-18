import api from "./api";

class ProductsService {
  static async getProducts(params = { page: 0, size: 1000 }) {
    try {
      const response = await api.get("/products", { params });
      return response.data;
    } catch (error) {
      console.error("Get products failed:", error?.response?.data?.message || error.message);
      throw error?.response?.data || error;
    }
  }

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

  static async addProduct(productData, file) {
    try {
      const formData = new FormData();
      formData.append("product", new Blob([JSON.stringify(productData)], { type: "application/json" }));
      
      if (file) {
        console.log("File to upload:", file.name, file);
        formData.append("file", file);
      } else {
        console.log("No file provided");
      }

      const response = await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log("Response from server:", response.data);
      return response.data;
    } catch (error) {
      console.error("Add product failed:", error?.response?.data?.message || error.message);
      throw error?.response?.data || error;
    }
  }

  // Cập nhật dữ liệu JSON
  static async updateProductData(productId, productData) {
    if (!productId) throw new Error("Product ID is required");
    try {
      const response = await api.put(`/products/edit/${productId}`, productData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Update product data failed:", error?.response?.data || error.message);
      throw error?.response?.data || error;
    }
  }

  // Cập nhật ảnh
  static async updateProductImage(productId, file) {
    if (!productId) throw new Error("Product ID is required");
    if (!file) throw new Error("File is required for image update");
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.put(`/products/edit/${productId}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Update product image failed:", error?.response?.data || error.message);
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