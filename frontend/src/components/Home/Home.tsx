import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import ReserveButton, { homeButtonStyle } from "./ReserveButton";
import BackgroundImage from "./BackgroundImage";
import GradientOverlay from "./Overlay";

const Home: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <>
      {/* First Section */}
      <BackgroundImage
        imageUrl="/images/home1.jpg"
        height="700px"
        backgroundSize="cover"
        backgroundPosition="center bottom"
      >
        <GradientOverlay colors="rgba(6, 11, 56, 0.67)">
          <Container
            maxWidth="xl"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              marginTop: "90px",
              opacity: animate ? 1 : 0, // Initial opacity state
              transition: "opacity 0.5s ease", // Opacity transition
              transform: animate ? "translateY(0)" : "translateY(-20px)",
            }}
          >
            <Typography
              variant="h1"
              gutterBottom
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "3.5rem",
                lineHeight: "1.2",
              }}
            >
              WELCOME TO NORTH DINE
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Quicksand, sans-serif",
                fontSize: "1.2rem",
                lineHeight: "1.6",
                maxWidth: "800px",
                margin: "auto",
              }}
            >
              Indulge in a sophisticated dining experience where modern elegance
              meets culinary innovation. Explore a diverse menu featuring
              exquisite dishes and artisanal cocktails crafted with passion and
              precision. Whether you're here for a memorable meal or a relaxing
              evening, expect impeccable service and a warm, inviting ambiance
              that elevates every visit.
            </Typography>
            <ReserveButton buttonStyles={homeButtonStyle} />
          </Container>
        </GradientOverlay>
      </BackgroundImage>

      {/* Second Section */}
      <BackgroundImage
        imageUrl="/images/home2.jpg"
        height="612px"
        top="700px"
        boxShadow="0px 15px 45px rgba(4, 6, 26, 1)"
        backgroundSize="cover"
        backgroundPosition="center bottom"
      >
        <GradientOverlay
          colors="linear-gradient(to right, rgba(0, 0, 0, 1), rgba(6, 11, 56, 0.9), rgba(6, 11, 56, 0))"
          backgroundSize="cover"
          backgroundPosition="center bottom"
        />
      </BackgroundImage>

      {/* Third Section */}
      <BackgroundImage
        imageUrl="/images/home3.jpg"
        height="612px"
        top="1312px"
        backgroundSize="cover"
        backgroundPosition="center bottom"
      >
        <GradientOverlay
          colors="linear-gradient(to top, rgba(6, 11, 56, 0.3), rgba(6, 11, 56, 0.7))"
          backgroundSize="cover"
          backgroundPosition="center bottom"
        />
      </BackgroundImage>
    </>
  );
};

export default Home;
