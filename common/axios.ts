import axios, { AxiosInstance } from "axios";

const CustomAxios: AxiosInstance = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default CustomAxios;
