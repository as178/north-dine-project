import React from "react";
import {
  Card,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";

interface CardReviewProps {
  title: string;
  body: string;
  user: { name: string; initial: string };
  sx?: object;
}

const CardReview: React.FC<CardReviewProps> = ({ title, body, user, sx }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const cardStyles = {
    border: "1px solid #ffffff",
    borderRadius: "5mm",
    background:
      "linear-gradient(to top, rgba(6, 11, 56, 0.67), rgba(255, 255, 255, 0))",
    padding: isSmallScreen ? "8px" : "20px",
    margin: "10px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow:
      "0 4px 8px rgba(0, 0, 0, 0.2), 0 0 10px rgba(255, 255, 255, 0.8)",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow:
        "0 8px 16px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.9)",
    },
    width: "300px",
    maxWidth: "300px",
    maxHeight: "240px",
    color: "#ffffff",
    ...sx,
  };

  return (
    <Card sx={cardStyles}>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontFamily: "Quicksand, sans-serif",
            fontSize: isSmallScreen ? "1rem" : "1.5rem",
            lineHeight: "1.6",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Quicksand, sans-serif",
            fontSize: isSmallScreen ? "0.8rem" : "1.2rem",
            lineHeight: "1.8",
          }}
        >
          {body}
        </Typography>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
        >
          <Avatar
            sx={{ bgcolor: "#ffffff", color: "#000000", marginRight: "10px" }}
          >
            {user.initial}
          </Avatar>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "Quicksand, sans-serif",
              fontSize: isSmallScreen ? "0.7rem" : "0.9rem",
              lineHeight: "1.5",
            }}
          >
            {user.name}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardReview;
