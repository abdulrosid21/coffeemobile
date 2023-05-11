import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosApiIntances = axios.create({
  baseURL: 'https://express-coffee-shop.vercel.app',
  // baseURL: 'http:192.168.0.113:3001/api/',
});

// Add a request interceptor
axiosApiIntances.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosApiIntances.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export default axiosApiIntances;
