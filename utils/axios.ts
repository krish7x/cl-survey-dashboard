import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

const baseURL = process.env.NEXTAPI_URL || "http://localhost:8000/api"
const instance = axios.create({
  baseURL,
});

export const axiosInstance = setupCache(instance);
