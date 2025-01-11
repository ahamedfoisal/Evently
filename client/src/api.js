import axios from 'axios';
axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export default api;