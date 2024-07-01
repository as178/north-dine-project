import React from "react";
import { Card, CardMedia } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface CardImageProps {
  imageUrl: string;
  imageAlt?: string;
  imageHeight?: string | number;
  cardStyle?: React.CSSProperties;
}

const CardImage: React.FC<CardImageProps> = ({
  imageUrl,
  imageAlt = "Image",
  imageHeight = "auto",
  cardStyle = {},
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card sx={{ borderRadius: "20px", ...cardStyle }}>
      <CardMedia
        component="img"
        height={isSmallScreen ? "auto" : imageHeight}
        image={imageUrl}
        alt={imageAlt}
        sx={{ borderRadius: "20px" }}
      />
    </Card>
  );
};

export default CardImage;
