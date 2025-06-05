import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    contacts: [],
    selectedContact: null,
    isContactsLoading: false,
    isMessagesLoading: false,

    getContacts: async () => {
        set({ isContactsLoading: true });
        try {
            const res = await axiosInstance.get("/message/contacts");
            set({ contacts: res.data });
        } catch (error) {
            toast.error("Kita kontakti");
        } finally {
            set({ isContactsLoading: false });
        }
    },

    getMessages: async(userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/message/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error("Kita poruke");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (data) => {
        const { selectedContact, messages } = get();
        try {
            const res = await axiosInstance.post(`/message/send/${selectedContact._id}`, data);
            console.log("cao")
            set({ messages: [...messages, res.data] });

        } catch (error) {
            toast.error("Poslao si kitu");
        }
    },

    subscribeToMessages: () => {
        const { selectedContact } = get();
        if (!selectedContact) return;

        const socket = useAuthStore.getState().socket;
        
        socket.on("newMessage", (newMessage) => {
            if (newMessage.senderId !== selectedContact._id) return;
            set({
                messages: [...get().messages, newMessage]
            });
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedContact: (selectedContact) => set({ selectedContact }),
}))