import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface DeliveryAddress {
    id: string;
    label: string;
    name: string;
    phone: string;
    address: string;
    isDefault: boolean;
}

export interface PaymentMethod {
    id: string;
    type: "card" | "bank" | "ewallet";
    name: string;
    details: string;
    isDefault: boolean;
}

export interface UserProfile {
    name: string;
    email: string;
    phone: string;
    avatar?: string;
}

export interface Settings {
    notifications: boolean;
    emailNotifications: boolean;
    orderUpdates: boolean;
    promotions: boolean;
    language: string;
    theme: "light" | "dark" | "auto";
}

interface ProfileState {
    profile: UserProfile;
    addresses: DeliveryAddress[];
    paymentMethods: PaymentMethod[];
    settings: Settings;

    // Profile actions
    updateProfile: (profile: Partial<UserProfile>) => void;

    // Address actions
    addAddress: (address: Omit<DeliveryAddress, "id">) => void;
    updateAddress: (id: string, address: Partial<DeliveryAddress>) => void;
    deleteAddress: (id: string) => void;
    setDefaultAddress: (id: string) => void;

    // Payment actions
    addPaymentMethod: (method: Omit<PaymentMethod, "id">) => void;
    updatePaymentMethod: (id: string, method: Partial<PaymentMethod>) => void;
    deletePaymentMethod: (id: string) => void;
    setDefaultPaymentMethod: (id: string) => void;

    // Settings actions
    updateSettings: (settings: Partial<Settings>) => void;
}

export const useProfileStore = create<ProfileState>()(
    persist(
        (set) => ({
            profile: {
                name: "Dexter Morgan",
                email: "dexter@example.com",
                phone: "+62 851 8819 0911",
            },

            addresses: [
                {
                    id: "1",
                    label: "Home",
                    name: "Dexter Morgan",
                    phone: "+62 851 8819 0911",
                    address: "Jalan By Pass Ngurah Rai, Denpasar, Bali, 80228",
                    isDefault: true,
                },
            ],

            paymentMethods: [
                {
                    id: "1",
                    type: "bank",
                    name: "BCA Virtual Account",
                    details: "**** **** **** 1234",
                    isDefault: true,
                },
            ],

            settings: {
                notifications: true,
                emailNotifications: true,
                orderUpdates: true,
                promotions: false,
                language: "English",
                theme: "light",
            },

            // Profile actions
            updateProfile: (profile) =>
                set((state) => ({
                    profile: { ...state.profile, ...profile },
                })),

            // Address actions
            addAddress: (address) =>
                set((state) => ({
                    addresses: [
                        ...state.addresses,
                        {
                            ...address,
                            id: Date.now().toString(),
                        },
                    ],
                })),

            updateAddress: (id, address) =>
                set((state) => ({
                    addresses: state.addresses.map((addr) =>
                        addr.id === id ? { ...addr, ...address } : addr
                    ),
                })),

            deleteAddress: (id) =>
                set((state) => ({
                    addresses: state.addresses.filter((addr) => addr.id !== id),
                })),

            setDefaultAddress: (id) =>
                set((state) => ({
                    addresses: state.addresses.map((addr) => ({
                        ...addr,
                        isDefault: addr.id === id,
                    })),
                })),

            // Payment actions
            addPaymentMethod: (method) =>
                set((state) => ({
                    paymentMethods: [
                        ...state.paymentMethods,
                        {
                            ...method,
                            id: Date.now().toString(),
                        },
                    ],
                })),

            updatePaymentMethod: (id, method) =>
                set((state) => ({
                    paymentMethods: state.paymentMethods.map((pm) =>
                        pm.id === id ? { ...pm, ...method } : pm
                    ),
                })),

            deletePaymentMethod: (id) =>
                set((state) => ({
                    paymentMethods: state.paymentMethods.filter(
                        (pm) => pm.id !== id
                    ),
                })),

            setDefaultPaymentMethod: (id) =>
                set((state) => ({
                    paymentMethods: state.paymentMethods.map((pm) => ({
                        ...pm,
                        isDefault: pm.id === id,
                    })),
                })),

            // Settings actions
            updateSettings: (settings) =>
                set((state) => ({
                    settings: { ...state.settings, ...settings },
                })),
        }),
        {
            name: "profile-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
