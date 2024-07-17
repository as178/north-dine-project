// ReservationForm.tsx

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  TextareaAutosize,
} from "@mui/material";

const ReservationForm: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [numPeople, setNumPeople] = useState<number | null>(null); // Initialize as null for empty state
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [occasion, setOccasion] = useState("");

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [numPeopleError, setNumPeopleError] = useState(false);

  const handleSubmit = () => {
    // Validate first name
    if (firstName.trim() === "") {
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
    }

    // Validate last name
    if (lastName.trim() === "") {
      setLastNameError(true);
    } else {
      setLastNameError(false);
    }

    // Validate email
    if (!email.trim().includes("@")) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    // Validate phone number (numbers only and at least 8 characters)
    if (!/^\d+$/.test(phone) || phone.trim().length < 8) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }

    // Validate number of people (between 1 and 50)
    if (numPeople === null || numPeople < 1 || numPeople > 50) {
      setNumPeopleError(true);
    } else {
      setNumPeopleError(false);
    }

    // Submit logic here (not implemented for demonstration)
    // For now, we'll just log the form data
    console.log({
      firstName,
      lastName,
      email,
      phone,
      numPeople,
      date,
      time,
      specialRequests,
      occasion,
    });
  };

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
        <Box sx={{ display: "flex", gap: "10px", width: "100%" }}>
          <TextField
            label="First Name"
            variant="outlined"
            sx={{ width: "50%" }}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={firstNameError}
            helperText={firstNameError ? "First name is required" : ""}
            onBlur={() => setFirstNameError(firstName.trim() === "")}
            InputProps={{ style: { textTransform: "uppercase" } }}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            sx={{ width: "50%" }}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={lastNameError}
            helperText={lastNameError ? "Last name is required" : ""}
            onBlur={() => setLastNameError(lastName.trim() === "")}
            InputProps={{ style: { textTransform: "uppercase" } }}
          />
        </Box>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          sx={{ width: "100%" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          helperText={emailError ? "Invalid email address" : ""}
          onBlur={() => setEmailError(!email.trim().includes("@"))}
        />
        <TextField
          label="Phone Number"
          type="tel"
          variant="outlined"
          sx={{ width: "100%" }}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={phoneError}
          helperText={phoneError ? "Invalid phone number" : ""}
          onBlur={() =>
            setPhoneError(!/^\d+$/.test(phone) || phone.trim().length < 8)
          }
        />
        <TextField
          label="Number of People"
          type="number"
          variant="outlined"
          sx={{ width: "100%" }}
          value={numPeople || ""}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (!isNaN(value)) {
              setNumPeople(value);
              if (value < 1 || value > 50) {
                setNumPeopleError(true);
              } else {
                setNumPeopleError(false);
              }
            } else {
              setNumPeopleError(true);
            }
          }}
          error={numPeopleError}
          helperText={
            numPeopleError ? "Number of people must be between 1 and 50" : ""
          }
          onBlur={() =>
            setNumPeopleError(
              numPeople === null || numPeople < 1 || numPeople > 50
            )
          }
        />
        {/* Additional Fields */}
        <TextField
          label="Date"
          type="date"
          variant="outlined"
          sx={{ width: "100%" }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          label="Time"
          type="time"
          variant="outlined"
          sx={{ width: "100%" }}
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <TextField
          label="Special Requests"
          variant="outlined"
          sx={{ width: "100%" }}
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          multiline
          minRows={3}
          maxRows={6}
        />
        <TextField
          label="Occasion"
          variant="outlined"
          sx={{ width: "100%" }}
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#1c1a40",
            color: "#ffffff",
            width: "100%",
            textTransform: "uppercase",
            marginTop: "10px",
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
