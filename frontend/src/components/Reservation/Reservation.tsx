import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import BackgroundImage from "../Home/BackgroundImage";
import GradientOverlay from "../Home/GradientOverlay";
import ReservationDetailsCard from "./ReservationDetails";

interface ReservationItem {
  title: string;
  description: string;
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
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingTop: "150px",
    overflowY: "auto",
    opacity: fadeIn ? 1 : 0,
    transition: "opacity 1.5s ease-in-out",
  };

  const gradientColors =
    "linear-gradient(to top, rgba(6, 11, 60, 1), rgba(6, 11, 30, 0.9), rgba(6, 11, 56, 0.65))";

  const reservations: ReservationItem[] = [
    {
      title: "Truffle Pizza",
      description:
        "Gourmet pizza topped with black truffle shavings, wild mushrooms, buffalo mozzarella, and fresh basil.",
    },
    {
      title: "Moscow Mule",
      description:
        "A refreshing cocktail made with vodka, spicy ginger beer, and lime juice, served in a copper mug with ice.",
    },
    // Add more reservations as needed
  ];

  return (
    <BackgroundImage imageUrl="/images/reservation1.jpg" height="100vh">
      <GradientOverlay colors={gradientColors}>
        <Box sx={{ height: "100vh", overflowY: "auto" }}>
          <Container maxWidth="xl" sx={containerStyles}>
            <Typography
              variant="h1"
              gutterBottom
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: { xs: "3rem", sm: "4rem" },
                lineHeight: "1.2",
                color: "#ffffff",
                textAlign: "center",
              }}
            >
              Make a Reservation
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Quicksand, sans-serif",
                fontSize: "1.2rem",
                lineHeight: "1.6",
                color: "#ffffff",
                marginBottom: "65px",
                textAlign: "center",
              }}
            >
              Reserve your table today and enjoy an unforgettable dining
              experience with us.
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={4}>
                <ReservationDetailsCard reservations={reservations} />
              </Grid>
              <Grid item xs={12} md={8}>
                <Box
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "20px",
                    padding: "20px",
                  }}
                >
                  {/* Reservation Form or any other content goes here */}
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      fontFamily: "Montserrat, sans-serif",
                      color: "#1c1a40",
                      textAlign: "center",
                    }}
                  >
                    Reservation Form Coming Soon
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </GradientOverlay>
    </BackgroundImage>
  );
};

export default Reservation;
