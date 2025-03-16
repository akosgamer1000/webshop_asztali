import axios from 'axios';
import store from './Store';

const url = "http://localhost:3000";

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: url
});


axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
});

export default axiosInstance;