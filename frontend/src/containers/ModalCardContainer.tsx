import React, { useState, useEffect, useCallback } from "react";
import ModalCard from "../components/Menu/ModalCard";
import { fetchFoodItemById, FoodItem } from "../services/foodItemService";
import { ReservationService } from "../services/reservationService";
import { Typography, Snackbar, IconButton, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReservationItem } from "../components/Reservation/ReservationCard";

export interface ModalCardContainerProps {
  itemId: number | null; // Changed to number
  modalOpen: boolean;
  onAddFoodItem: (item: ReservationItem) => void;
  closeModal: () => void;
}

const ModalCardContainer: React.FC<ModalCardContainerProps> = ({
  itemId,
  modalOpen,
  onAddFoodItem,
  closeModal,
}) => {
  const [item, setItem] = useState<FoodItem | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const loadItem = useCallback(async () => {
    if (itemId !== null) {
      setLoading(true);
      setError(null);

      try {
        const selectedItem = await fetchFoodItemById(itemId);
        setItem(selectedItem || null);
      } catch (error) {
        console.error("Failed to load item:", error);
        setError("Failed to load item. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  }, [itemId]);

  useEffect(() => {
    if (modalOpen) {
      loadItem();
    } else {
      setItem(null);
    }
  }, [modalOpen, loadItem]);

  const handleAddToReservation = async () => {
    if (item) {
      try {
        const reservationId =
          await ReservationService.getCurrentReservationId();
        if (reservationId) {
          const existingReservationDetails =
            await ReservationService.getReservationDetails(reservationId);
          const existingItem =
            existingReservationDetails.reservationFoodItems.find(
              (i) => i.foodItemId === item.id
            );

          if (existingItem) {
            const newQuantity = existingItem.quantity + 1;
            const totalPrice = item.price * newQuantity;
            await ReservationService.updateFoodItemQuantity(
              reservationId,
              item.id,
              newQuantity
            );
            onAddFoodItem({
              title: item.title,
              quantity: newQuantity,
              totalPrice,
              imageUrl: item.imageUrl,
              foodItemId: item.id,
            });
          } else {
            const totalPrice = item.price;
            await ReservationService.addFoodItemToReservation(reservationId, {
              foodItemId: item.id,
              quantity: 1,
              totalPrice,
            });
            onAddFoodItem({
              title: item.title,
              quantity: 1,
              totalPrice,
              imageUrl: item.imageUrl,
              foodItemId: item.id,
            });
          }

          setSnackbarOpen(true);
          setTimeout(() => {
            setSnackbarOpen(false);
          }, 2000);
          closeModal();
        } else {
          console.error("No reservation ID found");
        }
      } catch (error) {
        console.error("Failed to add item to reservation:", error);
      }
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <>
      <ModalCard
        item={item}
        modalOpen={modalOpen}
        closeModal={closeModal}
        onAddToReservation={handleAddToReservation}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setSnackbarOpen(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "1rem",
            fontWeight: "bold",
            textAlign: "center",
            background: "linear-gradient(to left, #187817, #00260a)",
            color: "#ffffff",
            textShadow: "0 0 2px #ffffff",
            boxShadow: "0 5px 10px #000000",
            "& .MuiAlert-icon": {
              color: "#ffffff",
            },
          }}
        >
          Item placed in your reservation
        </Alert>
      </Snackbar>
    </>
  );
};

export default ModalCardContainer;
