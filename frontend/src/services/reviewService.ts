import axios from 'axios';

const API_URL = 'http://localhost:5271/api/Review'; 

export const fetchReviews = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews', error);
    throw error;
  }
};
