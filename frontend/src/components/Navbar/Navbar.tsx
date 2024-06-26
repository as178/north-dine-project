import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Hidden,
  Drawer,
  IconButton,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../Logo/Logo";

// Styling the navbar using MUI's styled function
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  background: "linear-gradient(to right, #060b38, #423a5c, #060b38)",
  padding: theme.spacing(1.5),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const drawerWidth = 200;

const buttonStyles = {
  fontFamily: "Montserrat",
  fontSize: "1.13rem",
  marginX: 3,
  paddingX: 3,
  "&:hover": { textShadow: "0 0 8px #ffffff" },
};

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false); // State for Drawer open/close
  const [isMobileView, setIsMobileView] = useState(false); // State for mobile view detection

  useEffect(() => {
    // Effect hook to update isMobileView state based on window width
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1150); // Adjusted breakpoint for mobile view
    };

    handleResize(); // Initial call to handleResize
    window.addEventListener("resize", handleResize); // Event listener for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup: remove event listener
    };
  }, []); // Empty dependency array ensures effect runs only on mount and unmount

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen); // Function to toggle Drawer open/close state
  };

  const handleDrawerItemClick = () => {
    setDrawerOpen(false); // Function to close Drawer when an item is clicked
  };

  return (
    <AppBar position="static">
      <StyledToolbar>
        {/* North Dine logo */}
        <div style={{ position: "absolute", left: "20px" }}>
          <Link to="/">
            <Logo color="white" size={200} />
          </Link>
        </div>

        {/* Side drawer icon for smaller screens (hidden on larger screens) */}
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

        {/* Centered navbar buttons for larger screens (hidden on smaller screens) */}
        <Hidden mdDown>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Button
              component={Link}
              to="/"
              color="inherit"
              sx={
                !isMobileView
                  ? buttonStyles
                  : { ...buttonStyles, visibility: "hidden" }
              }
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/menu"
              color="inherit"
              sx={
                !isMobileView
                  ? buttonStyles
                  : { ...buttonStyles, visibility: "hidden" }
              }
            >
              Menu
            </Button>
            <Button
              component={Link}
              to="/locations"
              color="inherit"
              sx={
                !isMobileView
                  ? buttonStyles
                  : { ...buttonStyles, visibility: "hidden" }
              }
            >
              Locations
            </Button>
            <Button
              component={Link}
              to="/aboutus"
              color="inherit"
              sx={
                !isMobileView
                  ? buttonStyles
                  : { ...buttonStyles, visibility: "hidden" }
              }
            >
              About Us
            </Button>
          </div>
        </Hidden>

        {/* Side drawer for smaller screens + its buttons */}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
          <div style={{ width: drawerWidth, padding: "20px 10px" }}>
            <Button
              component={Link}
              to="/"
              color="inherit"
              sx={{
                ...buttonStyles,
                "&:hover": { fontWeight: "bold" },
                marginBottom: 3,
              }}
              onClick={handleDrawerItemClick}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/menu"
              color="inherit"
              sx={{
                ...buttonStyles,
                "&:hover": { fontWeight: "bold" },
                marginBottom: 3,
              }}
              onClick={handleDrawerItemClick}
            >
              Menu
            </Button>
            <Button
              component={Link}
              to="/locations"
              color="inherit"
              sx={{
                ...buttonStyles,
                "&:hover": { fontWeight: "bold" },
                marginBottom: 3,
              }}
              onClick={handleDrawerItemClick}
            >
              Locations
            </Button>
            <Button
              component={Link}
              to="/aboutus"
              color="inherit"
              sx={{
                ...buttonStyles,
                "&:hover": { fontWeight: "bold" },
                marginBottom: 3,
              }}
              onClick={handleDrawerItemClick}
            >
              About Us
            </Button>
          </div>
        </Drawer>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
