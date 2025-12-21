import axios, { AxiosError } from "axios";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json"
  }
});

axiosClient.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
