// Reservation.tsx

import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import BackgroundImage from "../Home/BackgroundImage";
import GradientOverlay from "../Home/GradientOverlay";
import ReservationCard from "./ReservationCard";
import ReservationForm from "./ReservationForm";

interface ReservationItem {
  title: string;
  quantity: number;
  totalPrice: number;
  imageUrl: string;
}

const Reservation: React.FC = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeIn(true);
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  const containerStyles = {
    minHeight: "100vh", // Ensure full viewport height
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingTop: "250px", // Initial padding for desktop view
    opacity: fadeIn ? 1 : 0,
    transition: "opacity 1.5s ease-in-out",
    overflowY: "auto", // Allow vertical scrolling
    "@media (max-width: 600px)": {
      paddingTop: "350px", // Adjusted padding for mobile view
    },
  };

  const gradientColors =
    "linear-gradient(to top, rgba(6, 11, 60, 1), rgba(6, 11, 30, 0.9), rgba(6, 11, 56, 0.65))";

  // Mock reservations for demonstration
  const reservations: ReservationItem[] = [
    {
      title: "Truffle Pizza",
      quantity: 1,
      totalPrice: 45.0,
      imageUrl: "/images/trufflepizza.png",
    },
    {
      title: "Lobster Thermidor",
      quantity: 1,
      totalPrice: 70.0,
      imageUrl: "/images/lobsterthermidor.png",
    },
    {
      title: "Seafood Risotto",
      quantity: 1,
      totalPrice: 55.0,
      imageUrl: "/images/seafoodrisotto.png",
    },
    {
      title: "Grilled Chicken Caesar Salad",
      quantity: 1,
      totalPrice: 25.0,
      imageUrl: "/images/grilledchickensalad.jpeg",
    },
    {
      title: "Filet Mignon",
      quantity: 1,
      totalPrice: 80.0,
      imageUrl: "/images/filetmignon.jpeg",
    },
  ];

  return (
    <BackgroundImage imageUrl="/images/reservation1.jpg" height="100vh">
      <GradientOverlay colors={gradientColors}>
        <Container
          maxWidth="xl"
          sx={{
            ...containerStyles,
            overflowY: "scroll", // Ensure the entire container is scrollable
          }}
        >
          <Typography
            variant="h1"
            gutterBottom
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: { xs: "2.5rem", sm: "4rem" },
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
              {/* Your Reservation Items */}
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "2rem",
                  color: "#ffffff",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                YOUR RESERVATION'S ITEMS
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                  },
                  gap: "20px",
                  maxHeight: "70vh", // Limit height to allow scrolling
                  overflowY: "auto", // Enable vertical scrolling
                }}
              >
                {reservations.map((item, index) => (
                  <ReservationCard key={index} item={item} index={index} />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Your Reservation Form */}
              <ReservationForm />
            </Grid>
          </Grid>
        </Container>
      </GradientOverlay>
    </BackgroundImage>
  );
};

export default Reservation;
