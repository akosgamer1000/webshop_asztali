/**
 * Axios Instance Configuration
 * 
 * This file configures a custom Axios instance for making HTTP requests to the API.
 * It includes:
 * - Base URL configuration
 * - Request/Response interceptors
 * - Authentication token handling
 * - Cache control headers
 * - Error handling
 */

import axios from 'axios';
import store from './Store';
import { jwtDecode } from 'jwt-decode';
import { logout } from './store/authSlice';

// API base URL for development
const url = "http://localhost:3000";

// Create a custom Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: url,
  // Disable caching for all requests
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }
});

/**
 * Request Interceptor
 * 
 * Adds authentication token to requests and prevents caching for GET requests
 * by adding a timestamp parameter.
 */
axiosInstance.interceptors.request.use((config) => {
  // Get authentication token from Redux store
  const token = store.getState().auth.token;
  
  // Check token expiration if it exists
  if (token) {
    try {
      const decodedToken = jwtDecode<{ exp: number }>(token);
      const currentTime = Date.now() / 1000;
      
     
      if (decodedToken.exp < currentTime + 60) {
        // Dispatch logout action
        store.dispatch(logout());
        // Throw error to prevent the request
        throw new Error('Token expired');
      }
      
      config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      // If token is invalid or expired, logout
      store.dispatch(logout());
      throw new Error('Invalid token');
    }
  }
  
  // Add timestamp to GET requests to prevent caching
  if (config.method === 'get') {
    config.params = {
      ...config.params,
      _t: new Date().getTime()
    };
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

/**
 * Response Interceptor
 * 
 * Handles API responses and errors.
 * Currently logs errors to console but can be extended for more
 * sophisticated error handling.
 */
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Log API errors to console
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;