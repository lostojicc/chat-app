import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set) => ({
    messages: [],
    contacts: [],
    selectedContact: null,
    isContactsLoading: false,
    isMessagesLoading: false,

    getContacts: async () => {
        set({ isContactsLoading: true });
        try {
            const res = axiosInstance.get("/messages/contacts");
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
            const res = axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error("Kita poruke");
        } finally {
            set({ isMessagesLoading: false });
        }
    }
}))