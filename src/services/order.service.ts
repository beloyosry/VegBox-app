import { Order, CartItem } from '../types';
import { simulateDelay } from '../config';

export const orderService = {
  createOrder: async (items: CartItem[], total: number): Promise<Order> => {
    await simulateDelay(1500);
    
    const order: Order = {
      id: 'ORD-' + Date.now(),
      items,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    return order;
  },
  
  getOrders: async (): Promise<Order[]> => {
    await simulateDelay();
    // Return empty array for now - can be extended with mock orders
    return [];
  },
  
  getOrderById: async (id: string): Promise<Order> => {
    await simulateDelay();
    throw new Error('Order not found');
  },
};
