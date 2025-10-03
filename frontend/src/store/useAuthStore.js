import { create } from "zustand";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { axiosInstance } from "../lib/axios.js";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "https://mern-chat-app-1-lowr.onrender.com";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isLoading: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,
    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/auth/check");
            set({ authUser: response.data, isCheckingAuth: false });
            get().connectSocket();
        } catch (error) {
            console.log("Error in checking auth", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    signup: async (data) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.post("/auth/signup", data);
            set({ authUser: response.data });
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoading: false });
        }
    },
    verifyEmail: async (code) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.post("/auth/verify-email", { code });
            set({ authUser: response.data });
            toast.success("Email Verified Successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoading: false });
        }
    },
    login: async (data) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.post("/auth/login", data);
            set({ authUser: response.data });
            toast.success("Logged In Successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoding: false });
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logout Successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const response = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: response.data });
            toast.success("Profile Updated Successfully");
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occured while trying to update profile");
            }
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
    deleteAccount: async () => {
        try {
            const response = await axiosInstance.delete("/auth/delete-account");
            toast.success(response.data.message);
            set({ authUser: null });
            get().disconnectSocket();
        } catch (error) {
            toast.success("Account deleted successfully");
        }
    },
    connectSocket: () => {
        const { authUser, socket } = get();
        if (!authUser || socket?.connected) return;
        const newSocket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
        });
        newSocket.connect();
        set({ socket: newSocket });
        newSocket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },
    disconnectSocket: () => {
        const { socket } = get();
        if (socket) {
            socket.off("getOnlineUsers");
            socket.off("messagesRead");
            if (socket.connected) {
                socket.disconnect();
            }
        }
    },
}));
