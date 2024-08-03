import React, { useState, useEffect } from "react";
import { ReservationService } from "../services/reservationService";
import Reservation from "../components/Reservation/Reservation";
import { ReservationItem } from "../components/Reservation/ReservationCard";

const ReservationContainer: React.FC = () => {
  const [reservations, setReservations] = useState<ReservationItem[]>([]);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const reservationId =
          await ReservationService.getCurrentReservationId();
        if (reservationId !== null) {
          // Fetch the reservation details based on the reservationId
          const data = await ReservationService.getReservationDetails(
            reservationId
          );
          setReservations(data);
        } else {
          console.warn("No current reservation found.");
        }
      } catch (error) {
        console.error("Failed to fetch reservations", error);
      }
    }

    fetchReservations();
  }, []);

  const handleAddFoodItem = async (
    reservationId: number,
    foodItem: { foodItemId: number; quantity: number; totalPrice: number }
  ) => {
    try {
      await ReservationService.addFoodItemToReservation(
        reservationId,
        foodItem
      );
      // Refresh reservations after adding the item
      const updatedReservations =
        await ReservationService.getReservationDetails(reservationId);
      setReservations(updatedReservations);
    } catch (error) {
      console.error("Failed to add food item", error);
    }
  };

  const handleUpdateQuantity = async (
    reservationId: number,
    foodItemId: number,
    quantity: number
  ) => {
    try {
      await ReservationService.updateFoodItemQuantity(
        reservationId,
        foodItemId,
        quantity
      );
      // Refresh reservations after updating quantity
      const updatedReservations =
        await ReservationService.getReservationDetails(reservationId);
      setReservations(updatedReservations);
    } catch (error) {
      console.error("Failed to update food item quantity", error);
    }
  };

  return (
    <Reservation
      reservations={reservations}
      onAddFoodItem={handleAddFoodItem}
      onUpdateQuantity={handleUpdateQuantity}
    />
  );
};

export default ReservationContainer;
