import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
// });

export const fetchEvents = async () => {
    const response = await axios.get(`${API_BASE_URL}/google-events`);
    return response.data.events;
  };

// export default api;