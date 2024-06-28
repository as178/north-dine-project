import React, { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import ReserveButton, { homeButtonStyle } from "./ReserveButton";

const Home: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const styles = {
    backgroundContainer: {
      position: "absolute",
      left: 0,
      right: 0,
      width: "100%",
      height: "700px",
      backgroundImage: `url(/images/home1.jpg)`,
      backgroundSize: "cover",
      backgroundPosition: "center bottom",
      overflow: "hidden",
    },
    overlayBox: {
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(6, 11, 56, 0.67)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      textAlign: "center",
      overflowY: "auto",
    },
    contentContainer: {
      maxWidth: "xl",
      transition: "transform 0.5s ease, opacity 1.25s ease",
      transform: animate ? "translateY(0)" : "translateY(-20px)",
      opacity: animate ? 1 : 0,
      marginTop: "40px",
    },
    heading: {
      fontFamily: "Montserrat, sans-serif",
      fontSize: "3.5rem",
      lineHeight: "1.2",
      textAlign: "center",
    },
    bodyText: {
      fontFamily: "Quicksand, sans-serif",
      fontSize: "1.2rem",
      lineHeight: "1.6",
      textAlign: "center",
      maxWidth: "800px",
      margin: "auto",
    },
  };

  return (
    <Box sx={styles.backgroundContainer}>
      <Box sx={styles.overlayBox}>
        <Container maxWidth="xl" sx={styles.contentContainer}>
          <Typography
            variant="h1"
            gutterBottom
            letterSpacing="0px"
            sx={styles.heading}
          >
            WELCOME TO NORTH DINE
          </Typography>
          <Typography variant="body1" sx={styles.bodyText}>
            Indulge in a sophisticated dining experience where modern elegance
            meets culinary innovation. Explore a diverse menu featuring
            exquisite dishes and artisanal cocktails crafted with passion and
            precision. Whether you're here for a memorable meal or a relaxing
            evening, expect impeccable service and a warm, inviting ambiance
            that elevates every visit.
          </Typography>
          <ReserveButton buttonStyles={homeButtonStyle} />
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
