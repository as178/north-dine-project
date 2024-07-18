import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  styled,
} from "@mui/material";

interface CardComponentProps {
  item: {
    title: string;
    imageUrl: string;
    description: string;
  };
  openModal: () => void;
}

const CustomCard = styled(Card)(({}) => ({
  height: "100%",
  maxWidth: "470px",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  borderRadius: "20px",
  overflow: "hidden",
  position: "relative",
  bottom: "20px",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.008)",
    boxShadow: "0 0px 25px rgba(93, 105, 212, 0.6)",
  },
}));

const CustomCardMedia = styled(CardMedia)(({}) => ({
  height: 0,
  paddingTop: "56.25%",
  position: "relative",
  overflow: "hidden",
  borderRadius: "20px",
  "&:hover": {
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.2))",
      transition: "opacity 0.3s ease-in-out",
      opacity: 1,
    },
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(rgba(29, 27, 71, 0), rgba(29, 27, 71, 0.45))",
    zIndex: 1,
  },
}));

const cardTitleStyles = {
  fontFamily: "Montserrat, sans-serif",
  textTransform: "uppercase",
  fontSize: "1.5rem",
  color: "#1c1a40",
  zIndex: 2,
};

const CardComponent: React.FC<CardComponentProps> = ({ item, openModal }) => {
  return (
    <div className="menu-card">
      <CustomCard onClick={openModal} aria-label={`View ${item.title}`}>
        <CustomCardMedia image={item.imageUrl} title={item.title} />
        <CardContent>
          <Typography variant="h5" component="div" sx={cardTitleStyles}>
            {item.title}
          </Typography>
        </CardContent>
      </CustomCard>
    </div>
  );
};

export default CardComponent;
