import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

interface ReservationItem {
  title: string;
  description: string;
}

interface ReservationDetailsCardProps {
  reservations: ReservationItem[];
}

const ReservationDetailsCard: React.FC<ReservationDetailsCardProps> = ({
  reservations,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "70vh",
        overflowY: "auto",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "20px",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      {reservations.map((item, index) => (
        <Card key={index} sx={{ marginBottom: "10px" }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                color: "#1c1a40",
                fontSize: "1rem",
              }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Quicksand, sans-serif",
                color: "#1c1a40",
              }}
            >
              {item.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ReservationDetailsCard;
