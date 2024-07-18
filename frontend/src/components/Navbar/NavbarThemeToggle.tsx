import React from "react";
import { IconButton } from "@mui/material";
import Brightness3Icon from "@mui/icons-material/Brightness3"; // Import Brightness3 icon

interface NavbarThemeToggleProps {
  isHighContrast: boolean;
  toggleHighContrast: () => void;
}

const NavbarThemeToggle: React.FC<NavbarThemeToggleProps> = ({
  isHighContrast,
  toggleHighContrast,
}) => (
  <IconButton
    edge="end"
    color="inherit"
    aria-label="toggle theme"
    onClick={toggleHighContrast}
    sx={{ position: "absolute", right: "80px" }} // Adjust position as needed
  >
    <Brightness3Icon color={isHighContrast ? "primary" : "inherit"} />
  </IconButton>
);

export default NavbarThemeToggle;
