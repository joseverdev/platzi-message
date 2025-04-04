import axios from 'axios';

const chatCookie = document.cookie.replace(/(?:(?:^|.*;\s*)jwt_chat\s*\=\s*([^;]*).*$)|^.*$/, "$1");

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${chatCookie}`,

  },
  withCredentials: true,
});

