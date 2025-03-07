import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "https://mern-chat-app-1-lowr.onrender.com/api",
    withCredentials: true,
});
