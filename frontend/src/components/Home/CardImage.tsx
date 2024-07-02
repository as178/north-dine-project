import React from "react";
import { Card, CardMedia, experimentalStyled } from "@mui/material";

interface CardImageProps {
  imageUrl: string;
  imageAlt?: string;
  imageHeight?: string | number;
  cardStyle?: React.CSSProperties;
  overlayGradient?: string;
}

const OverlayCard = experimentalStyled(Card)(
  ({ overlayGradient }: { overlayGradient?: string }) => ({
    position: "relative",
    overflow: "hidden",
    "&:before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: overlayGradient || "none",
      opacity: 0.2,
    },
  })
);

const CardImage: React.FC<CardImageProps> = ({
  imageUrl,
  imageAlt = "Image",
  imageHeight = "auto",
  cardStyle = {},
  overlayGradient,
}) => {
  return (
    <OverlayCard
      sx={{ borderRadius: "20px", ...cardStyle }}
      overlayGradient={overlayGradient}
    >
      <CardMedia
        component="img"
        height={imageHeight}
        image={imageUrl}
        alt={imageAlt}
        sx={{ borderRadius: "20px" }}
      />
    </OverlayCard>
  );
};

export default CardImage;
