import axios from 'axios';

const API_URL = 'http://localhost:5271/api/FoodItem';

export interface FoodItem {
  id: number; // Ensure 'id' is a number
  title: string;
  imageUrl: string;
  shortDescription: string;
  ingredients: string[];
  price: number;
  category: string; // Ensure 'category' is included
}

// Fetch all food items
export const fetchFoodItems = async (): Promise<FoodItem[]> => {
  try {
    const response = await axios.get<FoodItem[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching food items:', error);
    throw error;
  }
};

// Fetch a single food item by ID
export const fetchFoodItemById = async (id: number): Promise<FoodItem> => {
  try {
    const response = await axios.get<FoodItem>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching food item with ID ${id}:`, error);
    throw error;
  }
};
