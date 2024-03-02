import axios, { AxiosInstance, RawAxiosRequestHeaders } from 'axios';

const CustomAxios: AxiosInstance = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const ScrapingHeaders: RawAxiosRequestHeaders = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
};

export default CustomAxios;
