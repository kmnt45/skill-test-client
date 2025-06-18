import axios, { AxiosRequestConfig, isAxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const appAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

appAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (!isAxiosError(error) || error.response?.status !== 401 || originalRequest._retry) {
      throw error;
    }

    if (originalRequest.url?.includes('/auth/refresh')) {
      throw error;
    }

    originalRequest._retry = true;

    const refreshResponse = await appAxios.get('/auth/refresh');

    const newAccessToken = refreshResponse.data?.accessToken;
    if (newAccessToken) {
      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };
    }

    return appAxios(originalRequest);
  },
);


