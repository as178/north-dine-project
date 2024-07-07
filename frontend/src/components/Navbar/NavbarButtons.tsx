import { Button } from "@mui/material";
import { Link } from "react-router-dom";

interface NavbarButtonsProps {
  isMobileView: boolean;
  buttonStyles: React.CSSProperties;
}

const buttonData = [
  { label: "Home", to: "/" },
  { label: "Menu", to: "/menu" },
  { label: "Cart", to: "/cart" },
  { label: "About Us", to: "/aboutus" },
];

export const buttonStyles = {
  fontFamily: "Montserrat",
  fontSize: "1.13rem",
  marginX: 3,
  paddingX: 3,
  transition: "opacity 0.2s ease",
  "&:hover": {
    textShadow: "0 0 8px #ffffff",
    backgroundColor: "transparent",
  },
  "&:active": {
    opacity: 0.5,
  },
};

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
          disableTouchRipple
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
};
