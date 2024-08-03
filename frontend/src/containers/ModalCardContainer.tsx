import React, { useState, useEffect, useCallback } from "react";
import ModalCard from "../components/Menu/ModalCard";
import { fetchFoodItems } from "../services/foodItemService";
import { ReservationService } from "../services/reservationService";
import { Typography, Snackbar, IconButton, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ReservationItem } from "../components/Reservation/ReservationCard";

interface FoodItem {
  id: string;
  title: string;
  imageUrl: string;
  shortDescription: string;
  ingredients: string[];
  price: number;
}

export interface ModalCardContainerProps {
  itemId: string | null; // Update to accept null
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
    if (itemId) {
      setLoading(true);
      setError(null);

      try {
        const foodItems = await fetchFoodItems();
        const selectedItem = foodItems.find(
          (item: FoodItem) => item.id === itemId
        );
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
          const totalPrice = item.price; // Calculate total price as needed
          await ReservationService.addFoodItemToReservation(reservationId, {
            foodItemId: parseInt(item.id, 10),
            quantity: 1,
            totalPrice,
          });
          setSnackbarOpen(true);
          setTimeout(() => {
            setSnackbarOpen(false);
          }, 2000);
          onAddFoodItem({
            title: item.title,
            quantity: 1,
            totalPrice,
            imageUrl: item.imageUrl,
            id: "",
          });
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
