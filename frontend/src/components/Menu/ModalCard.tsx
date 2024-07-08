import React from "react";
import {
  Modal,
  Typography,
  CardMedia,
  CardContent,
  Button,
  Box,
} from "@mui/material";

interface ModalCardProps {
  item: {
    title: string;
    imageUrl: string;
    description: string;
    ingredients: string[];
  } | null;
  modalOpen: boolean;
  closeModal: () => void;
}

const ModalCard: React.FC<ModalCardProps> = ({
  item,
  modalOpen,
  closeModal,
}) => {
  const modalContentStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "800px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "20px",
    overflow: "hidden",
  };

  if (!item) return null;

  return (
    <Modal
      open={modalOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalContentStyles}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontFamily: "Montserrat, sans-serif",
            textTransform: "uppercase",
            fontSize: "2rem",
            color: "#1c1a40",
            marginBottom: "20px",
          }}
        >
          {item.title}
        </Typography>
        <CardMedia
          component="img"
          height="auto"
          image={item.imageUrl}
          alt={item.title}
          sx={{ width: "100%", borderRadius: "10px" }}
        />
        <CardContent>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Quicksand, sans-serif",
              fontSize: "1.2rem",
              lineHeight: "1.6",
              color: "#1c1a40",
              marginTop: "20px",
            }}
          >
            {item.description}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Montserrat, sans-serif",
              textTransform: "uppercase",
              fontSize: "1.2rem",
              color: "#1c1a40",
              marginTop: "30px",
            }}
          >
            Ingredients
          </Typography>
          <Box sx={{ marginTop: "10px" }}>
            {item.ingredients.map((ingredient, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  textTransform: "uppercase",
                  fontSize: "1rem",
                  color: "#1c1a40",
                }}
              >
                {ingredient}
              </Typography>
            ))}
          </Box>
        </CardContent>
        <Button
          onClick={closeModal}
          variant="contained"
          sx={{
            marginTop: "20px",
            backgroundColor: "#1c1a40",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#141229",
            },
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalCard;
