import { ImageSourcePropType } from 'react-native';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: ImageSourcePropType | string;
  category: string;
  unit: string;
  weight: string;
  origin?: string;
  condition?: string;
  fatContent?: string;
  inStock: boolean;
  rating?: number;
  reviews?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: ImageSourcePropType | string;
  productCount: number;
  color: string;
}

export interface Recipe {
  id: string;
  name: string;
  image: ImageSourcePropType | string;
  prepTime: number;
  category: string;
}
