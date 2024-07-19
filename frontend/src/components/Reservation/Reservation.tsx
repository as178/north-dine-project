import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
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
  const [reservations, setReservations] = useState<ReservationItem[]>([
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
    {
      title: "Beef Wellington",
      quantity: 1,
      totalPrice: 90.0,
      imageUrl: "/images/beefwellington.jpeg",
    },
    {
      title: "Moscow Mule",
      quantity: 1,
      totalPrice: 18.0,
      imageUrl: "/images/moscowmule.jpeg",
    },
    {
      title: "Negroni",
      quantity: 1,
      totalPrice: 20.0,
      imageUrl: "/images/negroni.jpeg",
    },
    {
      title: "French 75",
      quantity: 1,
      totalPrice: 22.0,
      imageUrl: "/images/french75.jpeg",
    },
    {
      title: "Martini",
      quantity: 1,
      totalPrice: 20.0,
      imageUrl: "/images/martini.jpeg",
    },
  ]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeIn(true);
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  const gradientColors =
    "linear-gradient(to top, rgba(2, 0, 10, 1), rgba(6, 11, 56, 0.75))";

  const handleDeleteItem = (index: number) => {
    setReservations((prevReservations) =>
      prevReservations.filter((_, i) => i !== index)
    );
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
          backgroundImage: gradientColors,
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
                    gap: "20px",
                    maxHeight: "70vh",
                    overflowY: "auto",
                  }}
                >
                  {reservations.map((item, index) => (
                    <ReservationCard
                      key={index}
                      item={item}
                      index={index}
                      onDelete={handleDeleteItem}
                    />
                  ))}
                </Box>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="reservation-page">
                <ReservationForm />
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Reservation;
