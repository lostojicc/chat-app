import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isSigningIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");

            set({ authUser: res.data });
        } catch (error) {
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signUp: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully!");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    signOut: async () => {
        try {
            const res = await axiosInstance.post("/auth/signout");
            set({ authUser: null });
            toast.success("Signed out successfully!");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    signIn: async (data) => {
        set({ isSigningIn: true });
        try {
            const res = await axiosInstance.post("/auth/signin", data);
            set({ authUser: res.data });
            toast.success("Signed in successfully!");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningIn: false });
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.patch("auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error("Kita");
        } finally {
            set({ isUpdatingProfile: false });
        }
    }
}))