import api from "./api";

class UsersService {
  // API login
  static async login(email, password) {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, role, userID, fullName } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userID);
        localStorage.setItem("fullName", fullName);
        if (role) localStorage.setItem("role", role.toUpperCase()); // Chuẩn hóa role thành uppercase
      }
      return response.data;
    } catch (error) {
      console.error(
        "Failed to login:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // API register
  static async register(userData) {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      console.error(
        "Can't registration:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Get Users list and paginate
  static async getUsers(page = 0, size = 1000) {
    try {
      const response = await api.get("/users", {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      console.error(
        "get data failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Edit User
  static async editUser(userId, userData) {
    try {
      const response = await api.put(`/users/edit/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error(
        "Update user failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Delete User
  static async deleteUser(userId) {
    try {
      const response = await api.delete(`/users/delete/${userId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Delete failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Show User
  static async showUser(userId) {
    try {
      const response = await api.get(`/users/show/${userId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Show failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // AUTHENTICATION CHECKED //
  static logout() {
    localStorage.clear();
  }

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem("role");
    return role == "ADMIN";
  }

  static isEmployee() {
    const role = localStorage.getItem("role");
    return role == "EMPLOYEE";
  }

  static isCustomer() {
    const role = localStorage.getItem("role");
    return role == "CUSTOMER";
  }

  static adminOnly() {
    return this.isAuthenticated() && this.isAdmin();
  }
}
export default UsersService;
