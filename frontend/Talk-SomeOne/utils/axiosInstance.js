import axios from "axios";

const axiosInstace = axios.create({
  baseURL: import.meta.BASEURL || "http://localhost:3000",
  withCredentials: true,
});

axiosInstace.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default axiosInstace;