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
      // Gửi dữ liệu product dưới dạng JSON
      formData.append("product", new Blob([JSON.stringify(productData)], { type: "application/json" }));
      
      // Kiểm tra và thêm file nếu có
      if (file) {
        console.log("File to upload:", file.name, file); // Debug file
        formData.append("file", file); // Đảm bảo key là "file" khớp với backend
      } else {
        console.log("No file provided");
      }

      const response = await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log("Response from server:", response.data); // Debug response
      return response.data;
    } catch (error) {
      console.error("Add product failed:", error?.response?.data?.message || error.message);
      throw error?.response?.data || error;
    }
  }

  static async editProduct(productId, productData, file) {
    if (!productId) throw new Error("Product ID is required");
  
    try {
      const formData = new FormData();
  
      if (productData && Object.keys(productData).length > 0) {
        formData.append("product", new File([JSON.stringify(productData)], "product.json", { type: "application/json" }));
      } else {
        console.warn("productData is empty!");
      }
  
      if (file) {
        formData.append("file", file);
      } else {
        console.log("No file uploaded");
      }
  
      // Log dữ liệu FormData
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
  
      const response = await api.put(`/products/edit/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Không cần thay đổi, FormData sẽ tự động xử lý
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("Update product failed:", error?.response?.data || error.message);
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