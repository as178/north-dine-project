import React, { useState, useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import ReservationCard from "./ReservationCard";
import ReservationForm from "./ReservationForm";
import ModalCardContainer from "../../containers/ModalCardContainer";
import { ReservationItem } from "./ReservationCard";

interface ReservationProps {
  reservations: ReservationItem[] | undefined; // Adjusted type to include undefined
  onAddFoodItem: (
    reservationId: number,
    foodItem: { foodItemId: number; quantity: number; totalPrice: number }
  ) => Promise<void>;
  onUpdateQuantity: (
    reservationId: number,
    foodItemId: number,
    quantity: number
  ) => Promise<void>;
}

const Reservation: React.FC<ReservationProps> = ({
  reservations = [], // Default to an empty array if undefined
  onAddFoodItem,
  onUpdateQuantity,
}) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeIn(true);
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  const handleAddFoodItem = async (item: ReservationItem) => {
    if (item.id && selectedItemId) {
      await onAddFoodItem(Number(selectedItemId), {
        foodItemId: parseInt(item.id),
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      });
      closeModal();
    }
  };

  const handleQuantityChange = async (index: number, newQuantity: number) => {
    const item = reservations[index];
    if (item.id && newQuantity >= 0) {
      await onUpdateQuantity(Number(item.id), parseInt(item.id), newQuantity);
    }
  };

  const handleDeleteItem = (_index: number) => {
    // Handle item removal logic
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItemId(null);
  };

  // Hardcoded ReservationItem
  const hardcodedItem: ReservationItem = {
    id: "1",
    quantity: 2,
    totalPrice: 20.0,
    title: "",
    imageUrl: "",
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
              <div className="reservation-page">
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "repeat(1, 1fr)",
                      sm: "repeat(2, 1fr)",
                      md: "repeat(3, 1fr)",
                    },
                    gap: 2,
                  }}
                >
                  {/* Render the hardcoded card */}
                  <ReservationCard
                    key={hardcodedItem.id}
                    item={hardcodedItem}
                    index={0}
                    onDelete={handleDeleteItem}
                    onQuantityChange={handleQuantityChange}
                    openModal={() => {
                      setModalOpen(true);
                      setSelectedItemId(hardcodedItem.id);
                    }}
                  />
                  {/* Render the dynamic cards if there are reservations */}
                  {reservations.length > 0 ? (
                    reservations.map((item, index) => (
                      <ReservationCard
                        key={item.id}
                        item={item}
                        index={index}
                        onDelete={handleDeleteItem}
                        onQuantityChange={handleQuantityChange}
                        openModal={() => {
                          setModalOpen(true);
                          setSelectedItemId(item.id);
                        }}
                      />
                    ))
                  ) : (
                    <Typography>No reservations available.</Typography>
                  )}
                </Box>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <ReservationForm
                onAddFoodItem={handleAddFoodItem}
                onUpdateQuantity={handleQuantityChange}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      {modalOpen && (
        <ModalCardContainer
          modalOpen={modalOpen}
          closeModal={closeModal}
          itemId={selectedItemId || ""}
          onAddFoodItem={handleAddFoodItem}
        />
      )}
    </Box>
  );
};

export default Reservation;
