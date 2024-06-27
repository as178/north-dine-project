import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

interface NavbarButtonsProps {
  isMobileView: boolean;
  buttonStyles: React.CSSProperties;
}

const buttonData = [
  { label: "Home", to: "/" },
  { label: "Menu", to: "/menu" },
  { label: "Locations", to: "/locations" },
  { label: "About Us", to: "/aboutus" },
];

export const NavbarButtons: React.FC<NavbarButtonsProps> = ({
  isMobileView,
  buttonStyles,
}) => {
  return (
    <div
      style={{
        marginLeft: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      {buttonData.map((button, index) => (
        <Button
          key={index}
          component={Link}
          to={button.to}
          color="inherit"
          sx={
            !isMobileView
              ? buttonStyles
              : { ...buttonStyles, visibility: "hidden" }
          }
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
};
