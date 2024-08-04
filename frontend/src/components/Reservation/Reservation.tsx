import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import ReservationCard from "./ReservationCard";
import ReservationForm from "./ReservationForm";
import ModalCardContainer from "../../containers/ModalCardContainer";
import { ReservationItem } from "./ReservationCard";

interface ReservationProps {
  reservation: {
    id: number;
    reservationFoodItems: ReservationItem[];
  };
  onAddFoodItem: (
    reservationId: number,
    foodItem: { foodItemId: number; quantity: number; totalPrice: number }
  ) => Promise<void>;
  onUpdateQuantity: (
    reservationId: number,
    foodItemId: number,
    quantity: number
  ) => Promise<void>;
  onDeleteItem: (index: number) => Promise<void>;
}

const Reservation: React.FC<ReservationProps> = ({
  reservation,
  onAddFoodItem,
  onUpdateQuantity,
  onDeleteItem,
}) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeIn(true);
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  const handleAddFoodItem = async (item: ReservationItem) => {
    if (item.foodItemId && selectedItemId !== null) {
      await onAddFoodItem(reservation.id, {
        foodItemId: item.foodItemId,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      });
      closeModal();
    }
  };

  const handleQuantityChange = async (index: number, newQuantity: number) => {
    const item = reservation.reservationFoodItems[index];
    if (item.foodItemId && newQuantity >= 0) {
      await onUpdateQuantity(reservation.id, item.foodItemId, newQuantity);
      console.log(
        `Quantity updated for item ${item.foodItemId}: ${newQuantity}`
      );
    }
  };

  const handleDeleteItem = async (index: number) => {
    await onDeleteItem(index);
    console.log(`Item at index ${index} deleted.`);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItemId(null);
  };

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 0,
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          backgroundImage: `url('/images/reservation1.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          backgroundImage:
            "linear-gradient(to top, rgba(2, 0, 10, 1), rgba(6, 11, 56, 0.75))",
          opacity: 0.9,
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 0,
          minHeight: "100vh",
          paddingTop: "150px",
          opacity: fadeIn ? 1 : 0,
          transition: "opacity 1.5s ease-in-out",
          "@media (max-width: 600px)": {
            paddingTop: "150px",
          },
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h1"
            gutterBottom
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: { xs: "2.5rem", sm: "3.5rem" },
              lineHeight: "1.2",
              color: "#ffffff",
              textAlign: "center",
            }}
          >
            MAKE YOUR RESERVATION
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Quicksand, sans-serif",
              fontSize: { xs: "0.9rem", sm: "1.2rem" },
              lineHeight: "1.6",
              color: "#ffffff",
              marginBottom: "45px",
              textAlign: "center",
            }}
          >
            Review what you wish to include in your reservation, pick a date and
            enjoy your unforgettable evening with us.
          </Typography>

          <Grid container spacing={4} justifyContent="flex-start">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "1.6rem",
                  color: "#ffffff",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                YOUR RESERVATION'S ITEMS
              </Typography>
              <Box
                sx={{
                  maxHeight: "650px",
                  overflowY: "auto",
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                  },
                  gap: 2,
                }}
              >
                {reservation.reservationFoodItems &&
                reservation.reservationFoodItems.length > 0 ? (
                  reservation.reservationFoodItems.map((item, index) => (
                    <ReservationCard
                      key={item.foodItemId}
                      item={item}
                      index={index}
                      onDelete={() => handleDeleteItem(index)}
                      onQuantityChange={(newQuantity) =>
                        handleQuantityChange(index, newQuantity)
                      }
                      reservationId={reservation.id}
                    />
                  ))
                ) : (
                  <Typography> </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <ReservationForm />
            </Grid>
          </Grid>
        </Container>
      </Box>
      {modalOpen && (
        <ModalCardContainer
          modalOpen={modalOpen}
          closeModal={closeModal}
          itemId={selectedItemId}
          onAddFoodItem={handleAddFoodItem}
        />
      )}
    </Box>
  );
};

export default Reservation;
