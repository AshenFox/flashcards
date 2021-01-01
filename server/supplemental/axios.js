import axios from 'axios';

const CustomAxios = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default CustomAxios;

/* let urls = {
    test: `http://localhost:3334`,
    development: 'http://localhost:3333/',
    production: 'https://your-production-url.com/'
} 
 baseURL: urls[process.env.NODE_ENV],

*/
