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

export default axiosInstance;