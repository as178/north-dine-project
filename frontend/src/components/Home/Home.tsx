import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import MenuButton, { homeButtonStyle } from "./MenuButton";
import BackgroundImage from "./BackgroundImage";
import GradientOverlay from "./GradientOverlay";
import CardImage from "./CardImage";
import CardReviewContainer from "../../containers/CardReviewContainer";

const Home: React.FC = () => {
  const [animate, setAnimate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSectionThreeVisible, setIsSectionThreeVisible] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setAnimate(true);

    const handleScroll = () => {
      const sectionTwo = document.getElementById("section-two");
      const sectionThree = document.getElementById("section-three");
      const scrollPosition = window.scrollY + window.innerHeight;

      if (sectionTwo && !isVisible) {
        const topOffset = sectionTwo.offsetTop;
        if (scrollPosition > topOffset) {
          setIsVisible(true);
        }
      }

      if (sectionThree && !isSectionThreeVisible) {
        const topOffset = sectionThree.offsetTop;
        if (scrollPosition > topOffset) {
          setIsSectionThreeVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isVisible, isSectionThreeVisible]);

  const sectionOneStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    transition: "transform 2s ease, opacity 2s ease",
    transform: animate ? "translateY(0)" : "translateY(-20px)",
    opacity: animate ? 1 : 0,
  };

  const sectionTwoStyles = {
    py: 4,
    transition: "opacity 3s ease",
    opacity: isVisible ? 1 : 0,
  };

  const cardImageStyles = {
    boxShadow: "0px 5px 40px rgba(0, 0, 0, 0.7)",
    borderRadius: "20px",
    transition: "opacity 2s ease",
    opacity: isVisible ? 1 : 0,
    width: "100%",
    maxWidth: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      marginLeft: "5%",
      marginRight: "5%",
    },
  };

  const textStyles = {
    transition: "opacity 2s ease",
    opacity: isVisible ? 1 : 0,
    fontFamily: "Quicksand, sans-serif",
    fontSize: { xs: "1rem", sm: "1.2rem" },
    lineHeight: "1.8",
    maxWidth: "100%",
  };

  return (
    <>
      {/* Section One */}
      <BackgroundImage
        imageUrl="/images/home1.jpg"
        height="700px"
        backgroundSize="cover"
        backgroundPosition="center bottom"
      >
        <GradientOverlay colors="rgba(6, 11, 56, 0.67)">
          <Container maxWidth="xl" sx={sectionOneStyles}>
            <Typography
              variant="h1"
              gutterBottom
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: { xs: "2.8rem", sm: "3.5rem" },
                lineHeight: "1.2",
              }}
            >
              WELCOME TO NORTH DINE
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Quicksand, sans-serif",
                fontSize: { xs: "1rem", sm: "1.2rem" },
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
            <MenuButton buttonStyles={homeButtonStyle} />
          </Container>
        </GradientOverlay>
      </BackgroundImage>

      {/* Section Two */}
      <BackgroundImage
        id="section-two"
        imageUrl="/images/home2.jpg"
        height="612px"
        top="700px"
        zIndex="1"
        boxShadow="0px 15px 45px rgba(4, 6, 26, 1)"
        backgroundSize="cover"
        backgroundPosition="center bottom"
      >
        <GradientOverlay
          colors="linear-gradient(to right, rgba(0, 0, 0, 1), rgba(6, 11, 56, 0.9), rgba(6, 11, 56, 0))"
          backgroundSize="cover"
          backgroundPosition="center bottom"
        >
          <Container maxWidth="xl" sx={sectionTwoStyles}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6} sx={{ order: isSmallScreen ? 1 : 2 }}>
                <Container
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    maxHeight: isSmallScreen ? "300px" : "none",
                  }}
                >
                  <CardImage
                    imageUrl="/images/home4.jpg"
                    imageHeight={isSmallScreen ? 200 : 400}
                    cardStyle={cardImageStyles}
                    overlayGradient="linear-gradient(to top right, rgba(43, 24, 140, 1), rgba(43, 24, 140, 0.9), rgba(6, 11, 56, 0))"
                  />
                </Container>
              </Grid>

              <Grid item xs={12} md={6} sx={{ order: isSmallScreen ? 2 : 1 }}>
                <Container
                  sx={{
                    maxWidth: "100%",
                    textAlign: "left",
                    padding: "0 20px",
                  }}
                >
                  <Typography variant="body1" sx={textStyles}>
                    From sizzling pizzas straight from our wood-fired oven to
                    exotic fruits bursting with freshness, our menu is a
                    celebration of diverse tastes. Pair your meal with artisanal
                    cocktails crafted by our expert mixologists at the bar,
                    where each sip is a journey through creativity and
                    refinement. Whether you're craving a hearty dinner or a
                    leisurely evening of drinks, North Dine promises an
                    unforgettable dining experience where every bite and sip
                    exceeds expectations.
                  </Typography>
                </Container>
              </Grid>
            </Grid>
          </Container>
        </GradientOverlay>
      </BackgroundImage>

      {/* Section Three */}
      <BackgroundImage
        id="section-three"
        imageUrl="/images/home3.jpg"
        height="612px"
        top="1312px"
        backgroundSize="cover"
        backgroundPosition="center bottom"
      >
        <Box
          component="div"
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            overflowY: "auto",
            backgroundImage:
              "linear-gradient(to top, rgba(6, 11, 56, 0.3), rgba(6, 11, 56, 0.85))",
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
          }}
        >
          <Container maxWidth="xl" sx={{ padding: "0 16px" }}>
            <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
              <Typography
                variant="h1"
                gutterBottom
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: { xs: "2.4rem", sm: "3.5rem" },
                  lineHeight: "1.2",
                  textAlign: "center",
                  color: "#FFFFFF",
                  marginTop: "100px",
                  marginBottom: "50px",
                }}
              >
                OUR CUSTOMERS' COMMENTARY
              </Typography>
            </Box>
            <CardReviewContainer />
          </Container>
        </Box>
      </BackgroundImage>
    </>
  );
};

export default Home;
