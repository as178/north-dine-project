import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

interface ReserveButtonProps {
  buttonStyles: React.CSSProperties;
}

export const homeButtonStyle = {
  fontFamily: "Montserrat",
  fontSize: "1.8rem",
  marginBottom: "-110px",
  transition: "opacity 0.2s ease",
  border: "0.5px solid transparent",
  borderRadius: "8px",
  "&:hover": {
    textShadow: "0 0 8px #ffffff",
    backgroundColor: "transparent",
    borderColor: "#ffffff",
    boxShadow: "0 0 15px 3px rgba(255, 255, 255, 0.65)",
  },
  "&:active": {
    opacity: 0.5,
  },
};

const ReserveButton: React.FC<ReserveButtonProps> = ({ buttonStyles }) => {
  return (
    <Button
      component={Link}
      to="/reserve"
      color="inherit"
      sx={buttonStyles}
      disableTouchRipple
    >
      RESERVE A TABLE
    </Button>
  );
};

export default ReserveButton;
