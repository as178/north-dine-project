import React from "react";
import {
  Modal,
  Typography,
  CardMedia,
  CardContent,
  Button,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { API_BASE_URL } from "../../config/config";
import { FoodItem } from "../../services/foodItemService";

interface ModalCardProps {
  item: FoodItem | null;
  modalOpen: boolean;
  closeModal: () => void;
  onAddToReservation: () => void;
}

const ModalCard: React.FC<ModalCardProps> = ({
  item,
  modalOpen,
  closeModal,
  onAddToReservation,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const modalContentStyles = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "570px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "20px",
    overflowY: "auto" as const,
    maxHeight: "90vh",
  };

  const cardMediaStyles = {
    height: "400px",
    width: "100%",
    objectFit: "cover",
    borderRadius: "10px",
  };

  if (!item) return null;

  return (
    <Modal open={modalOpen} onClose={closeModal}>
      <Box sx={modalContentStyles}>
        {isMobile && (
          <IconButton
            onClick={closeModal}
            sx={{
              position: "absolute",
              top: "0px",
              right: "0px",
              color: "text.primary",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
            aria-label="close"
            className="modal-button"
          >
            <CloseIcon />
          </IconButton>
        )}
        <Typography
          variant="h3"
          gutterBottom
          className="modal-card-text"
          style={{
            fontFamily: "Montserrat, sans-serif",
            textTransform: "uppercase",
            fontSize: "1.8rem",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          {item.title}
        </Typography>
        <CardMedia
          component="img"
          height="auto"
          image={`${API_BASE_URL}${item.imageUrl}`}
          alt={item.title}
          sx={cardMediaStyles}
        />
        <CardContent>
          <Typography
            variant="body1"
            className="modal-card-text"
            style={{
              fontFamily: "Quicksand, sans-serif",
              fontSize: "1rem",
              lineHeight: "1.6",
              marginTop: "20px",
              fontWeight: "bold",
            }}
          >
            {item.shortDescription || "No description available"}
          </Typography>
          <Typography
            variant="body1"
            className="modal-card-text"
            style={{
              fontFamily: "Montserrat, sans-serif",
              textTransform: "uppercase",
              fontSize: "1rem",
              marginTop: "30px",
              fontWeight: "bold",
            }}
          >
            Ingredients
          </Typography>
          <Box sx={{ marginTop: "10px" }}>
            {(item.ingredients || []).map((ingredient, index) => (
              <Typography
                key={index}
                variant="body1"
                className="modal-card-text"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  textTransform: "uppercase",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                }}
              >
                {ingredient}
              </Typography>
            ))}
          </Box>
          <Typography
            variant="h6"
            className="modal-card-text"
            style={{
              fontFamily: "Montserrat, sans-serif",
              textTransform: "uppercase",
              fontSize: "1.1rem",
              marginTop: "20px",
              fontWeight: "bold",
            }}
          >
            NZ${item.price.toFixed(2)}
          </Typography>
        </CardContent>
        <Button
          onClick={onAddToReservation}
          variant="contained"
          sx={{
            fontWeight: "bold",
            marginTop: "20px",
            backgroundColor: "#1c1a40",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#141229",
            },
          }}
          className="menu-card-button"
        >
          Add to Reservation
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalCard;
