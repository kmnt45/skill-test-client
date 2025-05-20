import axios, { AxiosRequestConfig, isAxiosError } from 'axios';

// import { SERVER_BASE_URL } from '../constants';

export const appAxios = axios.create({
  baseURL: 'http://localhost:5000',
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


