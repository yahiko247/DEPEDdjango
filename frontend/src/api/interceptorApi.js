import axios from "axios";

const interceptorApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

interceptorApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("I'm hungry");
        //add this route in the backend auth/jwt/refresh
        await api.post("/auth/jwt/refresh/");

        return interceptorApi(originalRequest);
      } catch (e) {
        console.error("Interceptor Error, Completely normal", e);
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  },
);

export default interceptorApi;
