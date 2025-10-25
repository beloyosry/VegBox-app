import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Order } from "../types";

interface OrderState {
    orders: Order[];
    addOrder: (order: Order) => void;
    getOrders: () => Order[];
    getOrderById: (id: string) => Order | undefined;
    clearOrders: () => void;
}

export const useOrderStore = create<OrderState>()(
    persist(
        (set, get) => ({
            orders: [],

            addOrder: (order) =>
                set((state) => ({
                    orders: [order, ...state.orders],
                })),

            getOrders: () => {
                const state = get();
                return state.orders;
            },

            getOrderById: (id) => {
                const state = get();
                return state.orders.find((order) => order.id === id);
            },

            clearOrders: () => set({ orders: [] }),
        }),
        {
            name: "order-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
