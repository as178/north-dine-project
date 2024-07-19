import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Hidden,
  IconButton,
  styled,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import Logo from "../Logo/Logo";
import { Link } from "react-router-dom";
import { buttonStyles, NavbarButtons } from "./NavbarButtons";
import { DrawerMenu } from "./NavbarDrawerMenu";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  background:
    "linear-gradient(to right, #04061a, #060b38, #423a5c, #060b38, #04061a)",
  padding: theme.spacing(1.5),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0px 15px 20px rgba(1, 4, 31, 0.5)",
}));

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [iconHovered, setIconHovered] = useState<boolean>(false);

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast);
    document.documentElement.classList.toggle(
      "high-contrast-theme",
      !isHighContrast
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1200);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerItemClick = () => {
    setDrawerOpen(false);
  };

  const handleIconHover = (hovered: boolean) => {
    setIconHovered(hovered);
  };

  return (
    <AppBar position="absolute">
      <StyledToolbar>
        <div style={{ position: "absolute", left: "20px" }}>
          <Link to="/">
            <Logo color="white" size={225} />
          </Link>
        </div>

        <Hidden lgUp>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{
              display: isMobileView ? "flex" : "none",
              position: "absolute",
              right: "20px",
            }}
          >
            {drawerOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Hidden>

        <Hidden mdDown>
          <NavbarButtons
            isMobileView={isMobileView}
            buttonStyles={buttonStyles}
          />
        </Hidden>

        <IconButton
          edge="end"
          color="inherit"
          aria-label="toggle theme"
          onMouseEnter={() => handleIconHover(true)}
          onMouseLeave={() => handleIconHover(false)}
          onClick={toggleHighContrast}
          sx={{
            position: "absolute",
            right: "80px",
          }}
        >
          <Brightness3Icon
            color={isHighContrast ? "primary" : "inherit"}
            sx={{
              transition: "filter 0.2s ease-in-out",
              filter: iconHovered ? "drop-shadow(0px 0px 7px #ffffff)" : "none",
            }}
          />
        </IconButton>

        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
          <DrawerMenu
            buttonStyles={buttonStyles}
            onClick={handleDrawerItemClick}
            drawerWidth={230}
          />
        </Drawer>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
