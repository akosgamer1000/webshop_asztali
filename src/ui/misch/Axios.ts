import axios from 'axios';
import store from './Store';

const url = "http://localhost:3000";


const axiosInstance = axios.create({
  baseURL: url,

  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }
});


axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  

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


axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {

    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;