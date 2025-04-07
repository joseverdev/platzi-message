import axios from 'axios';

const chatCookie = document.cookie.replace(/(?:(?:^|.*;\s*)jwt_chat\s*\=\s*([^;]*).*$)|^.*$/, "$1");

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${chatCookie}`,

  },
  withCredentials: true,
});

