import React from "react";
import {
  Card,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";

const ReviewCard: React.FC<{ title: string; body: string; user: string }> = ({
  title,
  body,
  user,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const cardStyles = {
    border: "1px solid #ffffff",
    borderRadius: "5mm",
    background:
      "linear-gradient(to top, rgba(6, 11, 56, 0.67), rgba(255, 255, 255, 0))",
    padding: "20px",
    margin: "10px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow:
      "0 4px 8px rgba(0, 0, 0, 0.2), 0 0 10px rgba(255, 255, 255, 0.8)", // Adding glow effect
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow:
        "0 8px 16px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.9)", // Increasing shadow on hover for pop-up effect
    },
    display: "flex",
    alignItems: "center",
    width: isSmallScreen ? "100%" : "45%",
    maxWidth: "300px",
    color: "#ffffff",
  };

  const iconStyles = {
    marginRight: "10px",
    backgroundColor: "#3f51b5",
    color: "#ffffff",
  };

  return (
    <Card sx={cardStyles}>
      <CardContent>
        <Avatar sx={iconStyles}>U</Avatar>
        <div>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontFamily: "Quicksand, sans-serif",
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
              lineHeight: "1.6",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              fontFamily: "Quicksand, sans-serif",
              fontSize: { xs: "0.8rem", sm: "1rem" },
              lineHeight: "1.4",
              color: "#cccccc",
            }}
          >
            {user}
          </Typography>
        </div>
        <Typography
          variant="body1"
          sx={{
            fontFamily: "Quicksand, sans-serif",
            fontSize: { xs: "1rem", sm: "1.2rem" },
            lineHeight: "1.8",
          }}
        >
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
