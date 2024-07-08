import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface CardComponentProps {
  item: {
    title: string;
    imageUrl: string;
    description: string;
  };
  openModal: () => void;
}

const CardComponent: React.FC<CardComponentProps> = ({ item, openModal }) => {
  const cardStyles = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    borderRadius: "20px",
    overflow: "hidden",
    position: "relative",
  };

  const cardMediaStyles = {
    height: 0,
    paddingTop: "56.25%",
  };

  const cardTitleStyles = {
    fontFamily: "Montserrat, sans-serif",
    textTransform: "uppercase",
    fontSize: "1.5rem",
    color: "#1c1a40",
    marginBottom: "10px",
  };

  return (
    <Card sx={cardStyles} onClick={openModal} aria-label={`View ${item.title}`}>
      <CardMedia
        image={item.imageUrl}
        title={item.title}
        sx={cardMediaStyles}
      />
      <CardContent>
        <Typography variant="h5" component="div" sx={cardTitleStyles}>
          {item.title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
