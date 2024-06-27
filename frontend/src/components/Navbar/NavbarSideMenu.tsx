import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

interface DrawerMenuProps {
  buttonStyles: React.CSSProperties;
  onClick?: () => void;
}

import { drawerWidth } from "./Navbar";

const menuItems = [
  { label: "Home", to: "/" },
  { label: "Menu", to: "/menu" },
  { label: "Locations", to: "/locations" },
  { label: "About Us", to: "/aboutus" },
];

export const DrawerMenu: React.FC<DrawerMenuProps> = ({
  buttonStyles,
  onClick,
}) => {
  const buttonTextColor = "#060b38"; // Define your desired text color here

  return (
    <div style={{ width: drawerWidth, padding: "20px 10px" }}>
      {menuItems.map((item, index) => (
        <Button
          key={index}
          component={Link}
          to={item.to}
          color="inherit"
          sx={{
            ...buttonStyles,
            color: buttonTextColor,
            "&:hover": { fontWeight: "bold" },
            marginBottom: 3,
          }}
          onClick={onClick}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};
