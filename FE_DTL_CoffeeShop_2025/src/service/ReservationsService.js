import api from "./api";

class ReservationsService {
  // Get Reservations list with pagination
  static async getReservations(page = 0, size = 1000) {
    try {
      const response = await api.get("/reservations", {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Get reservations failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Show Reservation by ID
  static async showReservation(reservationId) {
    if (!reservationId) {
      throw new Error("Reservation ID is required");
    }
    try {
      const response = await api.get(`/reservations/show/${reservationId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Show reservation failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Add Reservation
  static async addReservation(reservationData) {
    try {
      const response = await api.post("/reservations", reservationData);
      return response.data;
    } catch (error) {
      console.error(
        "Add reservation failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Edit Reservation
  static async editReservation(reservationId, reservationData) {
    if (!reservationId) {
      throw new Error("Reservation ID is required");
    }
    try {
      const response = await api.put(`/reservations/edit/${reservationId}`, reservationData);
      return response.data;
    } catch (error) {
      console.error(
        "Update reservation failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }

  // Delete Reservation
  static async deleteReservation(reservationId) {
    if (!reservationId) {
      throw new Error("Reservation ID is required");
    }
    try {
      const response = await api.delete(`/reservations/delete/${reservationId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Delete reservation failed:",
        error?.response?.data?.message || error.message
      );
      throw error?.response?.data || error;
    }
  }
}

export default ReservationsService;