
import axios from 'axios';
const API = axios.create({
  baseURL: 'https://healthvault-atbd.onrender.com/api',
  });
  
  // Add interceptor to attach token automatically
  API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
  export const fetchNotifications = () => API.get('/notifications');
  export const markAllAsRead = () => API.put('/notifications/mark-read');
  export const addMedication = (data) => API.post('/medication', data);
export const fetchMedications = () => API.get('/medication');
export const markTabletAsTaken = async (payload) => {
    console.log('Payload:', payload);
    const token = localStorage.getItem('token');
  return axios.post('https://healthvault-atbd.onrender.com/api/medication/mark-taken', payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };
  