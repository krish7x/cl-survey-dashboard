import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

//const baseURL = process.env.NEXT_PUBLIC_API_URL;
// const instance = axios.create({
//   baseURL,
// });

const instance = axios.create({
  baseURL: '/api',
});

export const axiosInstance = setupCache(instance);
