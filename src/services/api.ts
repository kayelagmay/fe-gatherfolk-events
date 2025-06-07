import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const fetchEvents = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/events`);
  return response.data;
};
