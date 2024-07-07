import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

interface MenuButtonProps {
  buttonStyles: React.CSSProperties;
}

export const homeButtonStyle = {
  fontFamily: "Montserrat",
  fontSize: "1.8rem",
  margin: "auto",
  top: "40px",
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

const MenuButton: React.FC<MenuButtonProps> = ({ buttonStyles }) => {
  return (
    <Button
      component={Link}
      to="/menu"
      color="inherit"
      sx={buttonStyles}
      disableTouchRipple
    >
      SEE OUR MENU
    </Button>
  );
};

export default MenuButton;
