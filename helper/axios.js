import axios from "axios";

const baseUrl = process.env.API_URL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export default axiosInstance;
