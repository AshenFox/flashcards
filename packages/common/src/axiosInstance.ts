import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
