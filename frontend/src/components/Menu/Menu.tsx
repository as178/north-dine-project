import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Modal,
  Button,
  Box,
} from "@mui/material";
import BackgroundImage from "../Home/BackgroundImage";
import GradientOverlay from "../Home/GradientOverlay";
import CardComponent from "./MenuCard";
import ModalCard from "./ModalCard";

const Menu: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeIn(true);
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  const containerStyles = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingTop: "150px",
    overflowY: "auto",
    opacity: fadeIn ? 1 : 0,
    transition: "opacity 1.5s ease-in-out",
  };

  const gradientColors =
    "linear-gradient(to bottom, rgba(6, 11, 30, 0.9), rgba(6, 11, 56, 0.7))";

  const items = {
    food: [
      {
        title: "Truffle Pizza",
        imageUrl: "/images/trufflepizza.png",
        description:
          "Gourmet pizza topped with black truffle shavings, wild mushrooms, buffalo mozzarella, and fresh basil, drizzled with truffle-infused olive oil.",
        ingredients: [
          "Pizza Dough",
          "Black Truffle Shavings",
          "Wild Mushrooms",
          "Buffalo Mozzarella",
          "Fresh Basil",
          "Truffle-infused Olive Oil",
        ],
      },
      {
        title: "Lobster Thermidor",
        imageUrl: "/images/lobsterthermidor.png",
        description:
          "Luxurious lobster tail with creamy Gruyere cheese sauce, white wine, and herbs.",
        ingredients: [
          "Lobster Tail",
          "Cream Sauce",
          "Gruyere Cheese",
          "White Wine",
          "Dijon Mustard",
          "Fresh Herbs",
        ],
      },
      {
        title: "Seafood Risotto",
        imageUrl: "/images/seafoodrisotto.png",
        description:
          "Creamy Arborio rice with shrimp, scallops, lobster, white wine, Parmesan cheese, and fresh herbs.",
        ingredients: [
          "Arborio Rice",
          "Shrimp",
          "Scallops",
          "Lobster",
          "White Wine",
          "Parmesan Cheese",
          "Fresh Herbs",
        ],
      },
      {
        title: "Grilled Chicken Caesar Salad",
        imageUrl: "/images/grilledchickensalad.jpeg",
        description:
          "Classic Caesar salad with grilled chicken and creamy dressing.",
        ingredients: [
          "Grilled Chicken",
          "Romaine Lettuce",
          "Parmesan Cheese",
          "Croutons",
        ],
      },
      {
        title: "Filet Mignon",
        imageUrl: "/images/filetmignon.jpeg",
        description:
          "Tender filet mignon steak cooked to perfection, served with a rich red wine reduction sauce.",
        ingredients: [
          "Filet Mignon",
          "Red Wine Reduction Sauce",
          "Seasonal Vegetables",
          "Mashed Potatoes",
        ],
      },
      {
        title: "Beef Wellington",
        imageUrl: "/images/beefwellington.jpeg",
        description:
          "Tender beef tenderloin wrapped in mushroom duxelles and prosciutto, encased in flaky puff pastry with Madeira sauce.",
        ingredients: [
          "Beef Tenderloin",
          "Mushroom Duxelles",
          "Prosciutto",
          "Puff Pastry",
          "Madeira Sauce",
        ],
      },
    ],
    drinks: [
      {
        title: "Moscow Mule",
        imageUrl: "/images/moscowmule.jpeg",
        description:
          "A refreshing cocktail made with vodka, spicy ginger beer, and lime juice, served in a copper mug with ice.",
        ingredients: ["Vodka", "Ginger Beer", "Lime Juice", "Ice"],
      },

      {
        title: "Negroni",
        imageUrl: "/images/negroni.jpeg",
        description:
          "A sophisticated Italian cocktail made with gin, vermouth rosso, and Campari, served over ice with an orange twist.",
        ingredients: ["Gin", "Vermouth Rosso", "Campari", "Orange Twist"],
      },
      {
        title: "French 75",
        imageUrl: "/images/french75.jpeg",
        description:
          "A refreshing champagne cocktail made with gin, lemon juice, sugar, and topped with champagne.",
        ingredients: ["Gin", "Lemon Juice", "Simple Syrup", "Champagne"],
      },
      {
        title: "Martini",
        imageUrl: "/images/martini.jpeg",
        description:
          "A sophisticated cocktail made with gin or vodka and vermouth, garnished with an olive or a twist of lemon.",
        ingredients: ["Gin or Vodka", "Dry Vermouth", "Olive or Lemon Twist"],
      },
      {
        title: "Mojito",
        imageUrl: "/images/mojito.jpeg",
        description:
          "A classic Cuban cocktail made with white rum, fresh mint leaves, lime juice, sugar, and soda water.",
        ingredients: [
          "White Rum",
          "Fresh Mint Leaves",
          "Lime Juice",
          "Sugar",
          "Soda Water",
        ],
      },
      {
        title: "Whiskey Sour",
        imageUrl: "/images/whiskeysour.jpeg",
        description:
          "A whiskey-based cocktail made with bourbon or rye whiskey, lemon juice, and simple syrup.",
        ingredients: ["Bourbon or Rye Whiskey", "Lemon Juice", "Simple Syrup"],
      },
    ],
  };

  const openModal = (item: any) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <BackgroundImage imageUrl="/images/menu1.jpg" height="100vh">
      <GradientOverlay colors={gradientColors}>
        <Box sx={{ height: "100vh", overflowY: "auto" }}>
          <Container maxWidth="xl" sx={containerStyles}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Quicksand, sans-serif",
                fontSize: "1.2rem",
                lineHeight: "1.6",
                color: "#ffffff",
                marginBottom: "65px",
              }}
            >
              Indulge in a culinary journey with our menu showcasing savory
              delights like wood-fired pizzas and succulent steaks, complemented
              by refreshing cocktails and handcrafted beverages.
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography
                  variant="h1"
                  gutterBottom
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: { xs: "3rem", sm: "4rem" },
                    lineHeight: "1.2",
                    color: "#ffffff",
                  }}
                >
                  OUR DISHES
                </Typography>
              </Grid>
              {items.food.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <CardComponent
                    item={item}
                    openModal={() => openModal(item)}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Typography
                  variant="h1"
                  gutterBottom
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: { xs: "3rem", sm: "4rem" },
                    lineHeight: "1.2",
                    marginTop: "40px",
                    color: "#ffffff",
                  }}
                >
                  OUR DRINKS
                </Typography>
              </Grid>
              {items.drinks.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <CardComponent
                    item={item}
                    openModal={() => openModal(item)}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
          <ModalCard
            item={selectedItem}
            modalOpen={modalOpen}
            closeModal={closeModal}
          />
        </Box>
      </GradientOverlay>
    </BackgroundImage>
  );
};

export default Menu;
