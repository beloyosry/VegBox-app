import { Product } from './product.types';

export interface CartItem {
  product: Product;
  quantity: number;
  selected: boolean;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}
