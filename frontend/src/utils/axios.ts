import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const chatCookie = document.cookie.replace(
    /(?:(?:^|.*;\s*)jwt_chat\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  config.headers.Authorization = `Bearer ${chatCookie}`;
  return config;
});
