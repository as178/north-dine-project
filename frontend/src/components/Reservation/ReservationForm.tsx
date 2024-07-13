// ReservationForm.tsx

import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const ReservationForm: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "20px",
        padding: "20px",
        maxHeight: "700px", // Allow the form to expand to the container height
        overflowY: "auto", // Enable vertical scrolling
        maxWidth: "600px", // Limit maximum width for responsiveness
        margin: "0 auto", // Center align horizontally
      }}
    >
      {/* Reservation Form */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontFamily: "Montserrat, sans-serif",
          color: "#1c1a40",
          textAlign: "center",
          fontSize: "1.5rem",
          textTransform: "uppercase",
        }}
      >
        Reservation Form
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <TextField
          label="FULL NAME"
          variant="outlined"
          sx={{ width: "100%" }}
        />
        <TextField
          label="EMAIL"
          type="email"
          variant="outlined"
          sx={{ width: "100%" }}
        />
        <TextField
          label="NUMBER OF GUESTS"
          type="number"
          variant="outlined"
          sx={{ width: "100%" }}
        />
        <TextField
          label="MOBILE PHONE"
          type="tel"
          variant="outlined"
          sx={{ width: "100%" }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1c1a40",
            color: "#ffffff",
            width: "100%",
            "&:hover": {
              backgroundColor: "#141328",
            },
          }}
        >
          Submit Reservation
        </Button>
      </Box>
    </Box>
  );
};

export default ReservationForm;
