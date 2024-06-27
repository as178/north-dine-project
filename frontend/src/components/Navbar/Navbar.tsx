import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Hidden,
  Drawer,
  IconButton,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../Logo/Logo";
import { NavbarButtons } from "./NavbarButtons";
import { DrawerMenu } from "./NavbarSideMenu";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  background: "linear-gradient(to right, #060b38, #423a5c, #060b38)",
  padding: theme.spacing(1.5),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const drawerWidth = 200;

const buttonStyles = {
  fontFamily: "Montserrat",
  fontSize: "1.13rem",
  marginX: 3,
  paddingX: 3,
  "&:hover": { textShadow: "0 0 8px #ffffff" },
};

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1150);
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

  return (
    <AppBar position="static">
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

        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
          <DrawerMenu
            buttonStyles={buttonStyles}
            onClick={handleDrawerItemClick}
          />
        </Drawer>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
