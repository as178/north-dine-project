import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { API_BASE_URL } from "../../config/config";
import { ReservationService } from "../../services/reservationService";

export interface ReservationItem {
  foodItemId: number;
  title: string;
  quantity: number;
  totalPrice: number;
  imageUrl: string;
}

interface ReservationCardProps {
  item: ReservationItem;
  index: number;
  reservationId: number;
  onDelete: (index: number) => void;
  onQuantityChange: (index: number, newQuantity: number) => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  item,
  index,
  reservationId,
  onDelete,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [open, setOpen] = useState(false);

  const handleIncrement = async () => {
    try {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(index, newQuantity);

      await ReservationService.updateFoodItemQuantity(
        reservationId,
        item.foodItemId,
        newQuantity
      );

      console.log("Quantity updated successfully");
      window.location.href = window.location.href; // Reload the current page
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const handleDecrement = async () => {
    if (quantity > 0) {
      try {
        const newQuantity = quantity - 1;

        if (newQuantity === 0) {
          setOpen(true);
        } else {
          setQuantity(newQuantity);
          onQuantityChange(index, newQuantity);
          await ReservationService.updateFoodItemQuantity(
            reservationId,
            item.foodItemId,
            newQuantity
          );
          console.log("Quantity updated successfully");
          window.location.href = window.location.href; // Reload the current page
        }
      } catch (error) {
        console.error("Failed to update quantity", error);
      }
    }
  };

  const handleRemove = async () => {
    try {
      await ReservationService.removeFoodItemFromReservation(
        reservationId,
        item.foodItemId
      );
      onDelete(index); // Remove item from parent component
      console.log("Item removed successfully");
      window.location.href = window.location.href; // Reload the current page
    } catch (error) {
      console.error("Failed to remove item", error);
    }
  };

  const handleClose = (remove: boolean) => {
    setOpen(false);
    if (remove) {
      handleRemove();
    }
  };

  const imageUrl = `${API_BASE_URL}${item.imageUrl}`;

  return (
    <>
      <div className="reservation-page">
        <Card
          key={item.foodItemId}
          sx={{
            maxWidth: "100%",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            background:
              "linear-gradient(to top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.95))",
            marginBottom: "0px",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: "150px",
              objectFit: "cover",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }}
            image={imageUrl}
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
                fontSize: "1rem",
                textTransform: "uppercase",
                lineHeight: "1.6",
                marginBottom: "5px",
              }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Quicksand, sans-serif",
                fontSize: "0.875rem",
                fontWeight: "bold",
                lineHeight: "1.6",
                marginBottom: "5px",
              }}
            >
              ${item.totalPrice.toFixed(2)}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Quicksand, sans-serif",
                fontSize: "0.875rem",
                fontWeight: "bold",
                lineHeight: "1.6",
                marginBottom: "5px",
              }}
            >
              Quantity: {quantity}
            </Typography>
            <div>
              <IconButton onClick={handleDecrement} size="small">
                <RemoveIcon />
              </IconButton>
              <IconButton onClick={handleIncrement} size="small">
                <AddIcon />
              </IconButton>
            </div>
          </CardContent>
        </Card>
        <Dialog
          open={open}
          onClose={() => handleClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Remove Item?"}</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to remove this item from your reservation?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose(false)}>Cancel</Button>
            <Button onClick={() => handleClose(true)} color="error">
              Remove
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default ReservationCard;
