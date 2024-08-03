import axios from 'axios';
import { ReservationItem } from '../components/Reservation/ReservationCard';

const API_BASE_URL = 'http://localhost:5271/api/Reservation';

export class ReservationService {
  static async getCurrentReservationId(): Promise<number | null> {
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      const reservations = response.data;
      if (reservations.length > 0) {
        return reservations[0].id; 
      }
      return null;
    } catch (error) {
      console.error('Failed to fetch reservations:', error);
      return null;
    }
  }

  static async getReservationDetails(reservationId: number): Promise<ReservationItem[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/${reservationId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch reservation details:', error);
      throw error;
    }
  }

  static async addFoodItemToReservation(reservationId: number, foodItem: { foodItemId: number; quantity: number; totalPrice: number; }): Promise<void> {
    try {
      await axios.post(`${API_BASE_URL}/${reservationId}/addFoodItem`, foodItem);
    } catch (error) {
      console.error('Failed to add food item to reservation:', error);
      throw error;
    }
  }

  static async updateFoodItemQuantity(reservationId: number, foodItemId: number, quantity: number): Promise<void> {
    try {
      await axios.put(`${API_BASE_URL}/${reservationId}/updateFoodItem`, { foodItemId, quantity });
    } catch (error) {
      console.error('Failed to update food item quantity:', error);
      throw error;
    }
  }
}
