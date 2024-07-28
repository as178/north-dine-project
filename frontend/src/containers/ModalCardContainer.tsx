import React, { useState, useEffect, useCallback } from "react";
import ModalCard from "../components/Menu/ModalCard";
import { fetchFoodItems } from "../services/foodItemService";
import { Typography } from "@mui/material";

// Define a type for the food item
interface FoodItem {
  id: string;
  title: string;
  imageUrl: string;
  shortDescription: string; // Adjust to match your API response
  ingredients: string[];
  price: number;
}

interface ModalCardContainerProps {
  itemId: string;
  modalOpen: boolean;
  closeModal: () => void;
}

const ModalCardContainer: React.FC<ModalCardContainerProps> = ({
  itemId,
  modalOpen,
  closeModal,
}) => {
  const [item, setItem] = useState<FoodItem | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch food items and find the selected one
  const loadItem = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const foodItems = await fetchFoodItems();
      const selectedItem = foodItems.find(
        (item: FoodItem) => item.id === itemId
      );
      setItem(selectedItem || null);
    } catch (error) {
      console.error("Failed to load item:", error);
      setError("Failed to load item. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [itemId]);

  useEffect(() => {
    if (modalOpen) {
      loadItem();
    } else {
      setItem(null); // Clear item when modal is closed
    }
  }, [modalOpen, loadItem]);

  if (loading) {
    return <Typography>Loading...</Typography>; // You can customize this loading state
  }

  if (error) {
    return <Typography color="error">{error}</Typography>; // Show error message
  }

  return (
    <ModalCard item={item} modalOpen={modalOpen} closeModal={closeModal} />
  );
};

export default ModalCardContainer;
