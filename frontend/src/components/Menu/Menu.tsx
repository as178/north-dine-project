import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import BackgroundImage from "../Home/BackgroundImage";
import GradientOverlay from "../Home/GradientOverlay";
import CardComponent from "./MenuCard";
import ModalCardContainer from "../../containers/ModalCardContainer"; // Import the new container
import { fetchFoodItems } from "../../services/foodItemService";

interface FoodItem {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  ingredients: string[];
  price: number;
  category: string;
}

const Menu: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [dishes, setDishes] = useState<FoodItem[]>([]);
  const [drinks, setDrinks] = useState<FoodItem[]>([]);

  useEffect(() => {
    const loadFoodItems = async () => {
      try {
        const data = await fetchFoodItems();
        setDishes(data.filter((item: FoodItem) => item.category === "Dishes"));
        setDrinks(data.filter((item: FoodItem) => item.category === "Drinks"));
      } catch (error) {
        console.error("Failed to load food items", error);
      }
    };

    loadFoodItems();
  }, []);

  const openModal = (itemId: string) => {
    setSelectedItemId(itemId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <BackgroundImage imageUrl="/images/menu1.jpg" height="100vh">
      <GradientOverlay colors="linear-gradient(to bottom, rgba(6, 11, 30, 0.9), rgba(6, 11, 56, 0.7))">
        <Box sx={{ height: "100vh", overflowY: "auto" }}>
          <Container
            maxWidth="xl"
            sx={{ minHeight: "100vh", paddingTop: "150px", overflowY: "auto" }}
          >
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
                    fontSize: { xs: "3rem", sm: "3.5rem" },
                    lineHeight: "1.2",
                    color: "#ffffff",
                  }}
                >
                  OUR DISHES
                </Typography>
              </Grid>
              {dishes.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <CardComponent
                    item={item}
                    openModal={() => openModal(item.id)}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Typography
                  variant="h1"
                  gutterBottom
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: { xs: "3rem", sm: "3.5rem" },
                    lineHeight: "1.2",
                    marginTop: "40px",
                    color: "#ffffff",
                  }}
                >
                  OUR DRINKS
                </Typography>
              </Grid>
              {drinks.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <CardComponent
                    item={item}
                    openModal={() => openModal(item.id)}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
          {selectedItemId && (
            <ModalCardContainer
              itemId={selectedItemId}
              modalOpen={modalOpen}
              closeModal={closeModal}
            />
          )}
        </Box>
      </GradientOverlay>
    </BackgroundImage>
  );
};

export default Menu;
