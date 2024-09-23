import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { apiConstants } from "./api-constants";
import { useAuthStore } from "@/stores/auth-store";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
const instance = axios.create({
  baseURL: apiConstants.url,
});

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    const authStore = useAuthStore();
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.get(
          apiConstants.url + apiConstants.refreshToken,
          {
            headers: {
              Authorization: `Bearer ${authStore.user?.refreshToken}`,
            },
          }
        );
        console.log(response.data);
        authStore.setUser(response.data);
        if (originalRequest) {
          originalRequest.headers.Authorization = `Bearer ${authStore.user?.accessToken}`;
        }
        return instance(originalRequest);
      } catch (refreshError) {
        authStore.signOutUser();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export { instance };
