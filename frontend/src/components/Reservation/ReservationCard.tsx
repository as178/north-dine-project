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

interface ReservationItem {
  title: string;
  quantity: number;
  totalPrice: number;
  imageUrl: string;
}

const ReservationCard: React.FC<{
  item: ReservationItem;
  index: number;
  onDelete: (index: number) => void;
}> = ({ item, index, onDelete }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [open, setOpen] = useState(false);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
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
            variant="body1"
            sx={{
              fontFamily: "Quicksand, sans-serif",
              fontSize: "0.85rem",
              fontWeight: "600",
              lineHeight: "1.8",
              marginBottom: "5px",
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
              fontSize: "0.9rem",
              lineHeight: "1.8",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            Total Price: ${item.totalPrice.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove Item?</DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Quicksand, sans-serif",
              fontSize: "1rem",
              textAlign: "center",
            }}
          >
            Are you sure you want to remove {item.title} from your reservation?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            No
          </Button>
          <Button onClick={() => handleClose(true)} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReservationCard;
