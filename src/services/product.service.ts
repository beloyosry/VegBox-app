import { Product, Category, Recipe } from '../types';
import { simulateDelay } from '../config';
import { mockProducts, mockCategories, mockRecipes } from '../data/mock-data';

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    await simulateDelay();
    return mockProducts;
  },
  
  getProductById: async (id: string): Promise<Product> => {
    await simulateDelay();
    const product = mockProducts.find((p) => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  },
  
  getProductsByCategory: async (categoryId: string): Promise<Product[]> => {
    await simulateDelay();
    const category = mockCategories.find((c) => c.id === categoryId);
    if (!category) {
      throw new Error('Category not found');
    }
    return mockProducts.filter((p) => p.category === category.name);
  },
  
  searchProducts: async (query: string): Promise<Product[]> => {
    await simulateDelay();
    const lowerQuery = query.toLowerCase();
    return mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
    );
  },
  
  getCategories: async (): Promise<Category[]> => {
    await simulateDelay();
    return mockCategories;
  },
  
  getRecipes: async (): Promise<Recipe[]> => {
    await simulateDelay();
    return mockRecipes;
  },
  
  getFlashSaleProducts: async (): Promise<Product[]> => {
    await simulateDelay();
    return mockProducts.filter((p) => p.discount && p.discount > 0);
  },
  
  getTodaySpecials: async (): Promise<Product[]> => {
    await simulateDelay();
    // Return products with high ratings
    return mockProducts.filter((p) => p.rating && p.rating >= 4.5);
  },
};
