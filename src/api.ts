import axios from 'axios';

// Đổi đường link này thành link Ngrok đuôi .app của bạn
export const API_URL = 'https://arletta-unfavoured-immemorially.ngrok-free.dev'; 

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tự động gắn Token nếu user đã đăng nhập
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});