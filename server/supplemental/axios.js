import axios from 'axios';

const CustomAxios = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default CustomAxios;
