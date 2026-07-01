import { handleUnauthorized } from "@features/auth/handleUnauthorized";
import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// The session lives in an httpOnly cookie that the browser sends automatically
// on same-origin requests, so no Authorization header is injected here.
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error?.response?.status === 401 && typeof window !== "undefined")
      handleUnauthorized();

    return Promise.reject(error);
  },
);

export default axiosInstance;

