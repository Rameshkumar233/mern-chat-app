import { create } from "zustand";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    setSelectedUser: (selectedUser) => set({ selectedUser: selectedUser }),
    isUsersLoading: false,
    isMessagesLoading: false,
    unreadCounts: {},
    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const response = await axiosInstance.get("/messages/users");
            set({ users: response.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },
    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const response = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: response.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const response = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({
                messages: [...messages, response.data],
            });
        } catch (err) {
            toast.error("Error sending message");
        }
    },
    deleteMessages: async (messageIds) => {
        try {
            const response = await axiosInstance.post("/messages/delete", { messageIds });
            set((state) => ({
                messages: state.messages.filter((message) => !messageIds.includes(message._id)),
            }));
            toast.success(response.data.message);
        } catch (error) {
            console.error("Error deleting messages:", error);
        }
    },
    subscribeToMessages: (userId) => {
        if (!userId) return;
        const socket = useAuthStore.getState().socket;
        // Check if the socket is valid
        if (!socket) {
            console.error("Socket is not initialized.", socket);
            return;
        }
        // Subscribe to messages for the selected user
        socket.emit("subscribeToMessages", userId);
        socket.on("newMessage", (newMessage) => {
            set({
                messages: [...get().messages, newMessage],
            });
        });
    },
    unsubscribeFromMessages: (userId) => {
        const socket = useAuthStore.getState().socket;
        if (!socket) {
            console.error("Socket is not initialized.", socket);
            return;
        }
        // Unsubscribe from messages for the selected user
        socket.emit("unsubscribeFromMessages", userId);
        socket.off("newMessage");
    },
}));
