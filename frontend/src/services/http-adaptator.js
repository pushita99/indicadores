import axios from "axios";
export const BASE_URL = import.meta.env.VITE_HOST;
export function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    return "Bearer " + user.token;
  } else {
    return "" ;
  }
}

export function bearerHeader(token) {
  return "Bearer " + token;
}

const instance = axios.create();
instance.interceptors.request.use((config) => {
  config.headers.Authorization = authHeader();
  return config;
});

export default instance;