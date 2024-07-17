import axios from "axios";

/**
 * Workshop Content:
 * Creates an instance of axios, basically something that acts like
 * Postman, to help send requests to our backend
 */

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
    headers: { "Content-Type": "application/json" },
    withCredentials: false,
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
    response => {
      // If the response is successful, return it
      return response;
    },
    error => {
      // Check for specific status codes to ignore
      if (error.response) {
        const { status } = error.response;
        if (status === 500 || status === 401) {
          // Ignore the error and return a default value
          return Promise.resolve({ data: null });
        }
      }
      // For other errors, return a rejected promise
      return Promise.reject(error);
    }
  );

export default axiosInstance;