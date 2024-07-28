import React, { useEffect, useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { fetchReviews } from "../services/reviewService";
import CardReview from "../components/Home/CardReview";

interface Review {
  id: number;
  title: string;
  body: string;
  userName: string;
  userInitial: string;
}

const CardReviewContainer: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const reviewsData = await fetchReviews();
        const sortedReviews = reviewsData.sort(
          (a: Review, b: Review) => b.id - a.id
        );
        const recentReviews = sortedReviews.slice(0, 3);
        setReviews(recentReviews);
      } catch (error) {
        console.error("Failed to load reviews", error);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: { xs: "16px", sm: "24px" } }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {reviews.map((review) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={review.id}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <CardReview
              title={review.title}
              body={review.body}
              user={{ name: review.userName, initial: review.userInitial }}
              sx={{
                maxWidth: { xs: "90%", sm: "100%" },
                margin: "0 auto",
                padding: { xs: "16px", sm: "24px" },
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardReviewContainer;
