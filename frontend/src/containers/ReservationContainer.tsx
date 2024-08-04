import React, { useState, useEffect } from "react";
import Reservation from "../components/Reservation/Reservation";
import { ReservationItem } from "../components/Reservation/ReservationCard";
import { ReservationService } from "../services/reservationService";
import { fetchFoodItemById } from "../services/foodItemService";

const ReservationContainer: React.FC = () => {
  const [reservation, setReservation] = useState<{
    id: number;
    reservationFoodItems: ReservationItem[];
  } | null>(null);

  useEffect(() => {
    async function fetchReservation() {
      try {
        const reservationId =
          await ReservationService.getCurrentReservationId();
        if (reservationId !== null) {
          const data = await ReservationService.getReservationDetails(
            reservationId
          );
          const itemsWithDetails = await Promise.all(
            data.reservationFoodItems.map(async (item) => {
              const foodItem = await fetchFoodItemById(item.foodItemId);
              return {
                ...item,
                title: foodItem.title,
                imageUrl: foodItem.imageUrl,
              };
            })
          );
          setReservation({ ...data, reservationFoodItems: itemsWithDetails });
        } else {
          console.warn("No current reservation found.");
        }
      } catch (error) {
        console.error("Failed to fetch reservation", error);
      }
    }

    fetchReservation();
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
      const updatedReservation = await ReservationService.getReservationDetails(
        reservationId
      );
      setReservation(updatedReservation);
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
      const updatedReservation = await ReservationService.getReservationDetails(
        reservationId
      );
      setReservation(updatedReservation);
    } catch (error) {
      console.error("Failed to update food item quantity", error);
    }
  };

  const handleDeleteItem = async (index: number) => {
    if (reservation) {
      try {
        const itemToDelete = reservation.reservationFoodItems[index];
        await ReservationService.removeFoodItemFromReservation(
          reservation.id,
          itemToDelete.foodItemId
        );
        const updatedReservation =
          await ReservationService.getReservationDetails(reservation.id);
        setReservation(updatedReservation);
      } catch (error) {
        console.error("Failed to delete food item", error);
      }
    }
  };

  if (!reservation) {
    return <div>Loading...</div>;
  }

  return (
    <Reservation
      reservation={reservation}
      onAddFoodItem={handleAddFoodItem}
      onUpdateQuantity={handleUpdateQuantity}
      onDeleteItem={handleDeleteItem}
    />
  );
};

export default ReservationContainer;
