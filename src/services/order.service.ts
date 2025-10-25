import { simulateDelay } from "../config";
import { useOrderStore } from "../store/order.store";
import { CartItem, Order } from "../types";

export const orderService = {
    createOrder: async (items: CartItem[], total: number): Promise<Order> => {
        await simulateDelay(1500);

        const order: Order = {
            id: "ORD-" + Date.now(),
            items,
            total,
            status: "pending",
            createdAt: new Date().toISOString(),
        };

        // Save order to store
        useOrderStore.getState().addOrder(order);

        return order;
    },

    getOrders: async (): Promise<Order[]> => {
        await simulateDelay();

        // Get orders from store (only return placed orders)
        const storedOrders = useOrderStore.getState().getOrders();

        return storedOrders;
    },

    getOrderById: async (id: string): Promise<Order> => {
        await simulateDelay();

        const order = useOrderStore.getState().getOrderById(id);

        if (!order) {
            throw new Error("Order not found");
        }

        return order;
    },
};
