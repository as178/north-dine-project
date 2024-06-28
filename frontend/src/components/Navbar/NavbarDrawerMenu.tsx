import { Button } from "@mui/material";
import { Link } from "react-router-dom";

interface DrawerMenuProps {
  drawerWidth: number;
  buttonStyles: React.CSSProperties;
  onClick?: () => void;
}

const menuItems = [
  { label: "Home", to: "/" },
  { label: "Menu", to: "/menu" },
  { label: "Locations", to: "/locations" },
  { label: "About Us", to: "/aboutus" },
];

export const DrawerMenu: React.FC<DrawerMenuProps> = ({
  drawerWidth,
  buttonStyles,
  onClick,
}) => {
  const buttonTextColor = "#060b38";

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
            "&:hover": {
              fontWeight: "bold",
              backgroundColor: "transparent",
            },
            marginBottom: 3,
          }}
          onClick={onClick}
          disableTouchRipple
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};
