// ReservationCard.tsx

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface ReservationItem {
  title: string;
  quantity: number;
  totalPrice: number;
  imageUrl: string;
}

const ReservationCard: React.FC<{ item: ReservationItem; index: number }> = ({
  item,
  index,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Card
      key={index}
      sx={{
        maxWidth: "100%", // Ensure the card adjusts to its container
        borderRadius: "12px", // Rounded corners
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Box shadow for depth
        background:
          "linear-gradient(to top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.95))", // White gradient background
        marginBottom: "0px", // Space between cards
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: "100%", // Full width of the card
          height: "150px", // Adjust height as needed
          objectFit: "cover", // Cover the entire area
          borderTopLeftRadius: "12px", // Rounded top corners
          borderTopRightRadius: "12px",
        }}
        image={item.imageUrl}
        alt={item.title}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#1c1a40",
          textAlign: "center",
          padding: "10px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Quicksand, sans-serif",
            fontSize: "1rem", // Smaller title font size
            textTransform: "uppercase",
            lineHeight: "1.6",
            marginBottom: "5px", // Space between title and quantity
          }}
        >
          {item.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Quicksand, sans-serif",
            fontSize: "0.85rem", // Smaller font size for quantity
            fontWeight: "600",
            lineHeight: "1.8",
            marginBottom: "5px", // Space between quantity and total price
          }}
        >
          Quantity:{" "}
          <IconButton
            size="small"
            onClick={handleDecrement}
            sx={{ color: "#1c1a40" }}
            aria-label="reduce quantity"
          >
            <RemoveIcon />
          </IconButton>{" "}
          {quantity}{" "}
          <IconButton
            size="small"
            onClick={handleIncrement}
            sx={{ color: "#1c1a40" }}
            aria-label="increase quantity"
          >
            <AddIcon />
          </IconButton>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Quicksand, sans-serif",
            fontSize: "0.9rem", // Smaller font size for total price
            lineHeight: "1.8",
            fontWeight: "bold",
            marginTop: "10px", // Add margin top for spacing
          }}
        >
          Total Price: ${item.totalPrice.toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReservationCard;
