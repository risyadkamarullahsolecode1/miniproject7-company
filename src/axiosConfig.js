import axios from 'axios';
import { store } from './store';
import { refreshToken, logout } from './slices/authSlice';

const apiClient = axios.create({
    baseURL: 'https://localhost:7071/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Jika error 401 dan belum mencoba refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await store.dispatch(refreshToken()).unwrap();
                // Token baru sudah di-set sebagai cookie oleh server
                return api(originalRequest);
            } catch (refreshError) {
                await store.dispatch(logout());
                throw refreshError;
            }
        }

        return Promise.reject(error);
    }
);
  

export default apiClient;