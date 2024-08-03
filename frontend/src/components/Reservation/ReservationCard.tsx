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

export interface ReservationItem {
  id: string; // Updated to be a string (or adjust as needed)
  title: string;
  quantity: number;
  totalPrice: number;
  imageUrl: string;
}

interface ReservationCardProps {
  item: ReservationItem;
  index: number;
  onDelete: (index: number) => void;
  onQuantityChange: (index: number, newQuantity: number) => void;
  openModal: () => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  item,
  index,
  onDelete,
  onQuantityChange,
  openModal,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [open, setOpen] = useState(false);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(index, newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(index, newQuantity);
    } else {
      setOpen(true);
    }
  };

  const handleClose = (remove: boolean) => {
    setOpen(false);
    if (remove) {
      onDelete(index);
    }
  };

  return (
    <>
      <Card
        key={index}
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
              lineHeight: "1.6",
              marginBottom: "5px",
            }}
          >
            Quantity: {quantity}
          </Typography>
          <IconButton onClick={handleDecrement} size="small">
            <RemoveIcon />
          </IconButton>
          <IconButton onClick={handleIncrement} size="small">
            <AddIcon />
          </IconButton>
          <IconButton onClick={openModal} size="small">
            <AddIcon />
          </IconButton>
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
    </>
  );
};

export default ReservationCard;
