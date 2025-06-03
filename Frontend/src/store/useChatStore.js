import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

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

    setSelectedContact: (selectedContact) => set({ selectedContact }),
}))