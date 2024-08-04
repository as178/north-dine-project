import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import BackgroundImage from "../Home/BackgroundImage";
import GradientOverlay from "../Home/GradientOverlay";
import CardComponent from "./MenuCard";
import ModalCardContainer from "../../containers/ModalCardContainer"; // Import the new container
import { fetchFoodItems } from "../../services/foodItemService";
import { ReservationItem } from "../../components/Reservation/ReservationCard";

interface FoodItem {
  id: number; // Ensure 'id' is a number
  title: string;
  imageUrl: string;
  shortDescription: string; // This will be used as 'description'
  ingredients: string[];
  price: number;
  category: string;
}

const Menu: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [dishes, setDishes] = useState<FoodItem[]>([]);
  const [drinks, setDrinks] = useState<FoodItem[]>([]);
  const [fadeIn, setFadeIn] = useState(false);

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeIn(true);
    }, 200); // Delay before content fades in

    return () => clearTimeout(timeout);
  }, []);

  const openModal = (itemId: number) => {
    setSelectedItemId(itemId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddFoodItem = (item: ReservationItem) => {
    console.log("Food item added:", item);
    // Implement logic to update local state or perform other actions if needed
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
                opacity: fadeIn ? 1 : 0,
                transition: "opacity 1s ease-in-out",
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
                    opacity: fadeIn ? 1 : 0,
                    transition: "opacity 1s ease-in-out",
                  }}
                >
                  OUR DISHES
                </Typography>
              </Grid>
              {dishes.map((item, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={item.id}
                  sx={{
                    opacity: fadeIn ? 1 : 0,
                    transition: "opacity 1s ease-in-out",
                    transitionDelay: `${index * 100}ms`, // Staggered delay for each card
                  }}
                >
                  <CardComponent
                    item={{
                      title: item.title,
                      imageUrl: item.imageUrl,
                      description: item.shortDescription, // Use shortDescription as description
                    }}
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
                    opacity: fadeIn ? 1 : 0,
                    transition: "opacity 1s ease-in-out",
                  }}
                >
                  OUR DRINKS
                </Typography>
              </Grid>
              {drinks.map((item, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={item.id}
                  sx={{
                    opacity: fadeIn ? 1 : 0,
                    transition: "opacity 1s ease-in-out",
                    transitionDelay: `${(index + dishes.length) * 100}ms`, // Staggered delay for each card
                  }}
                >
                  <CardComponent
                    item={{
                      title: item.title,
                      imageUrl: item.imageUrl,
                      description: item.shortDescription, // Use shortDescription as description
                    }}
                    openModal={() => openModal(item.id)}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
          {selectedItemId !== null && (
            <ModalCardContainer
              itemId={selectedItemId}
              modalOpen={modalOpen}
              closeModal={closeModal}
              onAddFoodItem={handleAddFoodItem} // Pass the implemented function
            />
          )}
        </Box>
      </GradientOverlay>
    </BackgroundImage>
  );
};

export default Menu;
