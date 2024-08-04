import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  createTheme,
  ThemeProvider,
  Button,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0e062b",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& $notchedOutline": {
            borderColor: "#0e062b",
          },
          "&:hover $notchedOutline": {
            borderColor: "#0e062b",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#0e062b",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#0e062b",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#0e062b",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#1a237e",
          },
        },
      },
    },
  },
});

interface SpecialRequests {
  romanticSetup: boolean;
  birthday: boolean;
  anniversary: boolean;
  engagement: boolean;
  wheelchairAccess: boolean;
  allergyAccommodations: boolean;
}

const ReservationForm: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [numPeople, setNumPeople] = useState<number | null>(null);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [specialRequests, setSpecialRequests] = useState<SpecialRequests>({
    romanticSetup: false,
    birthday: false,
    anniversary: false,
    engagement: false,
    wheelchairAccess: false,
    allergyAccommodations: false,
  });
  const [notes, setNotes] = useState<string>("");

  const [firstNameError, setFirstNameError] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [numPeopleError, setNumPeopleError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);
  const [timeError, setTimeError] = useState<boolean>(false);

  const handleSubmit = () => {
    if (firstName.trim() === "") {
      setFirstNameError(true);
    } else {
      setFirstNameError(false);
    }

    if (
      !firstNameError &&
      !lastNameError &&
      !emailError &&
      !phoneError &&
      !numPeopleError &&
      !dateError &&
      !timeError
    ) {
      console.log({
        firstName,
        lastName,
        email,
        phone,
        numPeople,
        date,
        time,
        specialRequests,
        notes,
      });
    }
  };

  const handleSpecialRequestChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSpecialRequests({
      ...specialRequests,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          background:
            "linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.45))",
          borderRadius: "20px",
          padding: "20px",
          maxHeight: "700px",
          overflowY: "auto",
          maxWidth: "600px",
          margin: "0 auto",
          border: "1px solid #ffffff",
          boxShadow:
            "0 4px 8px rgba(0, 0, 0, 0.2), 0 0 15px rgba(255, 255, 255, 0.8)",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontFamily: "Montserrat, sans-serif",
            color: "#0e062b",
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
              label="FIRST NAME"
              variant="outlined"
              sx={{ width: "50%" }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={firstNameError}
              helperText={firstNameError ? "First name is required" : ""}
              onBlur={() => setFirstNameError(firstName.trim() === "")}
              InputLabelProps={{
                style: { color: firstNameError ? "#ff0000" : "#0e062b" },
              }}
              color="primary"
              InputProps={{
                style: { color: "#0e062b", borderColor: "#0e062b" },
              }}
            />
            <TextField
              label="LAST NAME"
              variant="outlined"
              sx={{ width: "50%" }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={lastNameError}
              helperText={lastNameError ? "Last name is required" : ""}
              onBlur={() => setLastNameError(lastName.trim() === "")}
              InputLabelProps={{
                style: { color: lastNameError ? "#ff0000" : "#0e062b" },
              }}
              color="primary"
              InputProps={{
                style: { color: "#0e062b", borderColor: "#0e062b" },
              }}
            />
          </Box>
          <TextField
            label="EMAIL"
            type="email"
            variant="outlined"
            sx={{ width: "100%" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError ? "Invalid email address" : ""}
            onBlur={() => setEmailError(!email.trim().includes("@"))}
            InputLabelProps={{
              style: { color: emailError ? "#ff0000" : "#0e062b" },
            }}
            color="primary"
            InputProps={{
              style: { color: "#0e062b", borderColor: "#0e062b" },
            }}
          />
          <TextField
            label="PHONE NUMBER"
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
            InputLabelProps={{
              style: { color: phoneError ? "#ff0000" : "#0e062b" },
            }}
            color="primary"
            InputProps={{
              style: { color: "#0e062b", borderColor: "#0e062b" },
            }}
          />
          <TextField
            label="NUMBER OF PEOPLE"
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
            InputLabelProps={{
              style: { color: numPeopleError ? "#ff0000" : "#0e062b" },
            }}
            color="primary"
            InputProps={{
              style: { color: "#0e062b", borderColor: "#0e062b" },
            }}
          />
          <TextField
            label="DATE"
            type="date"
            variant="outlined"
            sx={{ width: "100%" }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            error={dateError}
            helperText={
              dateError
                ? "Please select any date from today until the end of the year"
                : ""
            }
            onBlur={() => {
              const selectedDate = new Date(date);
              const currentDate = new Date();
              const endOfYear = new Date(currentDate.getFullYear(), 11, 31);
              setDateError(
                selectedDate < currentDate || selectedDate > endOfYear
              );
            }}
            InputLabelProps={{
              shrink: true,
              style: { color: dateError ? "#ff0000" : "#0e062b" },
            }}
            color="primary"
            InputProps={{
              style: { color: "#0e062b", borderColor: "#0e062b" },
            }}
          />
          <TextField
            label="TIME"
            type="time"
            variant="outlined"
            sx={{ width: "100%" }}
            value={time}
            onChange={(e) => setTime(e.target.value)}
            error={timeError}
            helperText={
              timeError ? "Please select a time between 1:00pm to 10:30pm" : ""
            }
            onBlur={() => {
              const [hours, minutes] = time.split(":").map(Number);
              setTimeError(
                hours < 13 || hours > 22 || (hours === 22 && minutes > 0)
              );
            }}
            InputLabelProps={{
              shrink: true,
              style: { color: timeError ? "#ff0000" : "#0e062b" },
            }}
            color="primary"
            InputProps={{
              style: { color: "#0e062b", borderColor: "#0e062b" },
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontFamily: "Montserrat, sans-serif", color: "#0e062b" }}
            >
              SPECIAL REQUESTS
            </Typography>
            <div className="reservation-page">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginTop: "5px",
                  color: "#0e062b",
                  flex: 1,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={specialRequests.romanticSetup}
                      onChange={handleSpecialRequestChange}
                      name="romanticSetup"
                      color="primary"
                    />
                  }
                  label="Romantic Setup"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={specialRequests.birthday}
                      onChange={handleSpecialRequestChange}
                      name="birthday"
                      color="primary"
                    />
                  }
                  label="Birthday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={specialRequests.anniversary}
                      onChange={handleSpecialRequestChange}
                      name="anniversary"
                      color="primary"
                    />
                  }
                  label="Anniversary"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={specialRequests.engagement}
                      onChange={handleSpecialRequestChange}
                      name="engagement"
                      color="primary"
                    />
                  }
                  label="Engagement"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={specialRequests.wheelchairAccess}
                      onChange={handleSpecialRequestChange}
                      name="wheelchairAccess"
                      color="primary"
                    />
                  }
                  label="Wheelchair Access"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={specialRequests.allergyAccommodations}
                      onChange={handleSpecialRequestChange}
                      name="allergyAccommodations"
                      color="primary"
                    />
                  }
                  label="Allergy Accommodations"
                />
              </Box>
            </div>
          </Box>
          <TextField
            label="SPECIAL NOTES"
            variant="outlined"
            multiline
            rows={2}
            sx={{ width: "100%", color: "#0e062b" }}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            InputProps={{
              style: { color: "#0e062b", borderColor: "#0e062b" },
            }}
            InputLabelProps={{ style: { color: "#0e062b" } }}
            color="primary"
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: "10px",
            }}
          >
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                backgroundColor: "#0e062b",
                color: "#ffffff",
                width: "50%",
                textTransform: "uppercase",
                borderRadius: "10px",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#201645",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ReservationForm;
