import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "https://mern-chat-app-1-lowr.onrender.com" : "/api",
    withCredentials: true,
});
